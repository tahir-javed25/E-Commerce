import ImageUpload from '@/components/Admin-components/image-upload';
import AdminProductCard from '@/components/Admin-components/Product-tile';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from '@/store/Admin/productSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const Products = () => {
  const [formData , setFormData] =useState(initialFormData);
  const [openAddProducts, setOpenAddProducts] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [ LoadingState, setLoadingState] = useState(false);
  const [currentId , setCurrentId] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const {productsList} = useSelector((state)=>state.adminProducts)



  const onSubmit =(event)=>{
    event.preventDefault();
    // console.log("going to add the product",formData)

    currentId !== null ? dispatch(editProduct({id:currentId, formData})).then((data)=>{
      if(data?.payload?.success){
         setOpenAddProducts(false)
        dispatch(fetchAllProduct());
        setFormData(initialFormData);
        setImageFile(null);
        toast({
              title: "Product Edited successfully",
            });
      }
      // console.log(data.payload)
    })

   : dispatch(addNewProduct({...formData, image:uploadedImageUrl})).then((data)=>{
      console.log(data.payload);
      
      if(data?.payload?.success){
        setOpenAddProducts(false)
        dispatch(fetchAllProduct());
        setFormData(initialFormData);
        setImageFile(null);
        toast({
              title: "Product add successfully",
            });
      }
    });

  }

  const handleDelete =(id)=>{
    dispatch(deleteProduct(id)).then((data)=>{
       if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    })
  }

   useEffect(()=>{
      dispatch(fetchAllProduct());
    }, [ dispatch])

    // console.log(productsList);
    // console.log("product page here");
  return (
   <>
  
    <div className='flex  w-full mb-4 justify-end border'>
     <Button onClick ={()=>{setOpenAddProducts(true)}} >
      <span>Add Products</span>
    </Button>
    </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList && productsList.length > 0
          ? productsList.map((productItem) => (
              <AdminProductCard
                key={productItem._id}
                setFormData={setFormData}
                setOpenAddProducts={setOpenAddProducts}
                setCurrentId={setCurrentId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

   <Sheet open ={openAddProducts} onOpenChange={()=>{setOpenAddProducts(false); setCurrentId(null);
          setFormData(initialFormData);}} >
    <SheetContent side ="right" className="overflow-auto" >
      <SheetHeader>
        <SheetTitle>Add New Products</SheetTitle>
      </SheetHeader>
      <ImageUpload
      imageFile = {imageFile}
      setImageFile = {setImageFile}
      uploadedImageUrl = {uploadedImageUrl}
      setUploadedImageUrl = {setUploadedImageUrl}
      LoadingState = {LoadingState}
      setLoadingState = {setLoadingState}
      isEditMode={currentId !== null}
      
      />
      <div>
        <CommonForm 
        formData={formData}
        setFormData={setFormData}
        buttonText={currentId !== null ? "Edit" : "Add"}
        formControldata={addProductFormElements}
        onSubmit={onSubmit}
        
        
        />
      </div>
    </SheetContent>
   </Sheet>
   </>
  )
}

export default Products;
