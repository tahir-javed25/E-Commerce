import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef } from "react";
import { Image, ImageUpIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";



const ImageUpload = ({imageFile, isEditMode, setImageFile,uploadedImageUrl, setUploadedImageUrl,LoadingState, setLoadingState}) => {
    const inputRef = useRef();

    const handleDragImage =(event)=>{
        event.preventDefault();
    }

    const handleDropImage =(event)=>{
        event.preventDefault();
        const dropedImage = event.dataTransfer.files?.[0]
        console.log(event.dataTransfer.files?.[0]);
        
        if(dropedImage) setImageFile(dropedImage);
    }

    const handleUploadImage =(event)=>{
        event.preventDefault();
        const uploadImage = event.target.files?.[0]
        // console.log(event.target.files);
        
        if(uploadImage) setImageFile(uploadImage);
    }

        const handleRemoveImage =(event)=>{
        setImageFile(null)

        if(inputRef.current) inputRef.current.vaule = '';
    }


    const uploadToCloudinary = async ()=>{
      setLoadingState(true);
      const data = new FormData ();
      data.append("my_file", imageFile);

        if (uploadedImageUrl) {
        const publicId = uploadedImageUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public_id from the ImageURL
        data.append("public_id", publicId); // Send public_id for deletion
    }
    // console.log(data.get("public_id"));
      try {
      const response = await axios.post("http://localhost:3000/admin/products/upload-image",data)

      console.log(response.data)
      if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setLoadingState(false);  }
      } catch (error) {
         console.error("Error uploading/deleting image:", error);
      }
      
    }

  useEffect(() => {
    if (imageFile !== null) uploadToCloudinary();
  }, [imageFile]);


  return (
    <div>
      <Label className="font-semibold" >Upload Image</Label>
      <div className="border-2 flex border-dashed rounded-lg p-4 mt-1" onDrag={handleDragImage} onDrop={handleDropImage}>
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          heref={inputRef}
          onChange = {handleUploadImage}
          disabled = {isEditMode}
        />
        {!imageFile ? ( 
            <Label
          htmlFor="image-upload"
          className="flex flex-col justify-center items-center gap-2"
        >
          <ImageUpIcon className="w-10 h-10 cursor-pointer text-muted-foreground" />
          <span>Select Image or Drag and Drop here </span>
        </Label>

        ) : LoadingState ? (<Skeleton className="h-10 bg-gray-300" />) 
        : (
        <div className="w-full flex items-center justify-between border-2 ">
         <Image className="flex items-center justify-center"/>   
        <Label className="font-semibold">{imageFile.name}</Label>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={handleRemoveImage}
        >
          <XIcon className="w-4 h-4" />
          <span className="sr-only">Remove File</span>
        </Button>
            </div> )} 
        
      </div>
    </div>
  );
};

export default ImageUpload;
