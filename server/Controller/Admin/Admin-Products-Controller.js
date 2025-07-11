import { Products } from "../../Model/Products-model.js";
import cloudinary from "../../utils/Cloudinary.js";


// upload image or destroy previous one and upload new one...
export const productImage =async (req,res)=>{
    try {
        const public_id  = req.body?.public_id || null; // Get public_id for deletion (optional)
        // console.log(req.body);
         
        const imageFile = req.files?.my_file; // Get new image file
      
        // console.log(imageFile);
        
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        // Step 1: Delete previous image if public_id exists
        if (public_id) {
            await cloudinary.uploader.destroy(public_id);
            // console.log("Deleted previous image:", public_id);
        }

        // Step 2: Upload new image
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
        // console.log("Uploaded new image:", result);

        res.status(200).json({
            success: true,
            message: "Image updated successfully!",
            result
        });
    }
     catch (error) {
        console.error("Error updating image:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}

export const fetchAllProducts =async (req,res)=>{
    try {
    const listOfProducts =await Products.find({})
      res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
}


export const addNewProducts =async (req,res) =>{
    console.log(req.body);
    
    const {image,
  title ,
  description,
  category,
  brand,
  price,
  salePrice,
  totalStock,
  averageReview} = req.body;

  try {
      const newlyAddedProduct = new Products({
image,
  title ,
  description,
  category,
  brand,
  price,
  salePrice,
  totalStock,
  averageReview
  })

   await newlyAddedProduct.save();
   res.status(200).json({
    success:true,
    message:"Product SuccessFully Added ",
    result:newlyAddedProduct
   })

  } catch (error) {
     res.status(400).json({
    success:false,
    message:"Product Can't be added ",
   })
  }
}


export const editProduct =async (req,res)=>{
    try {
    const { id } = req.params;
    console.log(req.params.id, req.body)
     const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

     const updatedProduct = await Products.findById(id)

    if(!updatedProduct){
        res.status(400).json({
            message: "Product not exists",
        })}

    updatedProduct.image = image || updatedProduct.image    
    updatedProduct.title = title || updatedProduct.title    
    updatedProduct.description = description || updatedProduct.description    
    updatedProduct.category = category || updatedProduct.category    
    updatedProduct.brand = brand || updatedProduct.brand
    updatedProduct.price = price === "" ? 0 : price || updatedProduct.price   
    updatedProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;    updatedProduct.image = image || updatedProduct.image    
    updatedProduct.totalStock = totalStock || updatedProduct.totalStock
    updatedProduct.averageReview = averageReview|| updatedProduct.averageReview

        await updatedProduct.save();

        res.status(200).json({
            success:true,
            message:"Updated Successfuly",
            result:updatedProduct
        })
} catch (error) {
    res.status(400).json({
        success:false,
        message:"Can't update the Product"
    })
    
} 

}


export const deleteProduct =async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteProduct = await Products.findByIdAndDelete(id)

    if (!deleteProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
}
