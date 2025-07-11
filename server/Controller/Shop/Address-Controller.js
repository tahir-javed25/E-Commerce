import { Address } from "../../Model/address.js";

export const addAddress = async (req, res) => {
  // console.log(req.body);
  try {
    const {
      userId,name,address,city,state,pincode,country,phone,email,notes} = req.body;

    if (
      !userId ||!address ||!city ||!pincode ||!phone || !notes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
    });

    console.log("Address Controller",newAddress);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  // console.log(req.params);
  
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addressList = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    // console.log(userId,addressId);
    

    if (!userId  || !addressId) {
      return res.status(400).json({ message: "User and Address Id's are required" });
    }

    await Address.findOneAndDelete({_id:addressId,userId});
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const  formData  = req.body;

    console.log(userId,addressId,req.body);
    

    if (!formData) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!userId || !addressId) {
      return res.status(400).json({ message: "User and address Id's are required" });
    }

    const address = await Address.findOneAndUpdate(
      { userId, _id:addressId },
      formData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: address,
    });

    if (!address) {
      return res.status(400).json({ message: "Address not found" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
