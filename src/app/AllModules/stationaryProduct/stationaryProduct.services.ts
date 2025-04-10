import { StationaryProduct } from "./stationaryProduct.interface";
import { stationaryProductModel } from "./stationaryProduct.model";

const createStationaryProductIntoDB = async (product: StationaryProduct) => {
    const result = await stationaryProductModel.create(product)
    return result;
}

const getAllProducts = async (page: number = 1, limit: number = 10, searchQuery?: string, sort: number = -1, categories?: string[], priceSort?: number,minPrice?:number,
    maxPrice?:number) => {
    const skip = (page - 1) * limit;
    const query: any = { isDeleted: false };

    // Search functionality
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      query.$or = [
        { name: { $regex: regex } },
        { brand: { $regex: regex } },
        { description: { $regex: regex } }
      ];
    }

    // Category filter
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Sorting
    const sortOptions: any = { createdAt: sort };
    if (priceSort !== undefined) {
      sortOptions.price = priceSort;
    }

    const result = await stationaryProductModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    const totalProducts = await stationaryProductModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalProducts / limit);
    return {result, totalProducts, totalPages, currentPage: page};
}

const getSingleProduct = async (id: string) => {
    const result = await stationaryProductModel.findOne({ _id: id })
    return result
}

const updateProducts = async (id: string, payload: Partial<StationaryProduct>) => {
  const updatedProduct = await stationaryProductModel.findOneAndUpdate(
    { _id: id, isDeleted: false }, // filter
    { $set: payload },             // update
    {
      new: true,                   // return the updated document
      runValidators: true          // apply schema validations
    }
  ).exec();

  if (!updatedProduct) {
    throw new Error('Product not found or has been deleted');
  }

  return updatedProduct;
};

const deleteProduct = async (id: string) => {
    const result = await stationaryProductModel.updateOne({ _id: id }, { isDeleted: true }, { upsert: true })
    return result
}

export const StationaryProductServices = { createStationaryProductIntoDB, getAllProducts, getSingleProduct, updateProducts, deleteProduct }