import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button';

const AddressCard = ({selectedId,handleDeleteAddress,singleAddressItem,handleEditAddress,setCurrentSelectedAddress}) => {
    // console.log(singleAddressItem, "addressInfo");
  return (
    <div>
      <Card  onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(singleAddressItem)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === singleAddressItem?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}>

        <CardContent className="grid gap-4 p-4" >
            <Label>Address</Label>

       <Label><span>Full Address: </span>{singleAddressItem?.address}</Label>
       <Label><span>City: </span>{singleAddressItem?.city}</Label>
       <Label><span>Pincode: </span>{singleAddressItem?.pincode}</Label>
       <Label><span>Phone No.: </span>{singleAddressItem?.phone}</Label>
        </CardContent>
        <CardFooter className="flex justify-between" >
        <Button onClick={() => handleEditAddress(singleAddressItem)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(singleAddressItem)}>Delete</Button>
        </CardFooter>

      </Card>
    </div>
  )
}

export default AddressCard
