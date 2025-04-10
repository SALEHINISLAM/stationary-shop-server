import { StationaryProductServices } from "./stationaryProduct.services";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { StatusCodes } from "http-status-codes";

const createProduct = catchAsync(async (req, res) => {
    const product = req.body
    const result = await StationaryProductServices.createStationaryProductIntoDB(product)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product added successfully",
        data: result
    })
})

const getAllProducts = catchAsync(async (req, res) => {
    // Parse and validate query parameters
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const sort = req.query.sort ? parseInt(req.query.sort as string, 10) : -1;
    const priceSort = req.query.priceSort !== undefined ? parseInt(req.query.priceSort as string, 10) : undefined;
    const minPrice = req.query.minPrice !== undefined ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice !== undefined ? parseFloat(req.query.maxPrice as string) : undefined;

    const searchQuery = req.query.searchQuery ? String(req.query.searchQuery) : undefined;

    // Parse categories - supports both comma-separated strings and array inputs
    let categories: string[] | undefined;
    if (req.query.categories) {
        if (typeof req.query.categories === "string") {
            categories = req.query.categories.split(",");
        } else if (Array.isArray(req.query.categories)) {
            categories = req.query.categories as string[];
        }
    }

    // Fetch products using the service layer
    const result = await StationaryProductServices.getAllProducts(
        page,
        limit,
        searchQuery,
        sort,
        categories,
        priceSort,
        minPrice,
        maxPrice
    );
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Products retrieved successfully",
        data: result
    })
})

const getSingleProduct = catchAsync(async (req, res) => {
    const id = req.params.productId
    const result = await StationaryProductServices.getSingleProduct(id as string)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product retrieved successfully",
        data: result
    })
})

const updateProduct = catchAsync(async (req, res) => {
    const productId = req.params.productId; 
    const updateData = req.body;

    const result = await StationaryProductServices.updateProducts(productId, updateData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
});

const deleteProduct = catchAsync(async (req, res) => {
    const productId = req.params.productId;
    const result = await StationaryProductServices.deleteProduct(productId);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product deleted successfully",
        data: result
    });
});

export const StationaryProductController = {
    createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct
}