import { StationaryProduct } from "./stationaryProduct.interface";
import { stationaryProductModel } from "./stationaryProduct.model";

const createStationaryProductIntoDB=async (product:StationaryProduct)=>{
    const result=await stationaryProductModel.create(product)
    return result;
}

const getAllProducts=async()=>{
    const result=await stationaryProductModel.find()
    return result
}

const getSingleProduct=async(id:string)=>{
    const result=await stationaryProductModel.findOne({_id:id})
    return result
}

const updateProducts=async(id:string,updatedProduct:object)=>{
    const result=await stationaryProductModel.updateOne({_id:id},updatedProduct,{upsert:false})
    return result
}

const deleteProduct=async(id:string)=>{
    const result=await stationaryProductModel.updateOne({_id:id},{isDeleted:true},{upsert:true})
    return {}
}

export const StationaryProductServices={createStationaryProductIntoDB,getAllProducts,getSingleProduct,updateProducts,deleteProduct}