import { Products } from "../../Model/Products-model.js";

export const getAllFilteredProducts = async (req,res)=>{
    // console.log(req.query);
    
    const {category = [], brand = [], sort="price-lowtohigh"} = req.query;
    try {

        const filter = {};

        if(category.length){
          filter["category"] = {$in:category.split(",")};
        }

        if(brand.length){
            filter["brand"] = {$in:brand.split(",")};
        }
         let sorted = {};

    switch (sort) {
      case "price-lowtohigh":
        sorted.price = 1;

        break;
      case "price-hightolow":
        sorted.price = -1;

        break;
      case "title-atoz":
        sorted.title = 1;

        break;

      case "title-ztoa":
        sorted.title = -1;

        break;

      default:
        sorted.price = 1;
        break;
    }

        const products = await Products.find(filter).sort(sorted);
        // console.log(products);

        res.status(200).json({
            success:true,
            data:products
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
    }

}

export const getProductDetails = async (req,res)=>{

    const {id} = req.params;
    console.log(id);
    try {
         const product = await Products.findById(id);
    console.log(product);

    res.status(200).json({
        success:true,
        data:product
    })

    } catch (error) {
        res.status(404).json({
            success:true,
            message:"Product not found"
        })
        
    }    
}