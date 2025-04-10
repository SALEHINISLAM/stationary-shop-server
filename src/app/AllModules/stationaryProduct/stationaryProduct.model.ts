import { model, Schema } from 'mongoose';
import { StationaryProduct } from './stationaryProduct.interface';

const stationaryProductSchema = new Schema<StationaryProduct>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required'],
        trim: true,
        minlength: [5, 'Photo must be at least 5 characters'],
        maxlength: [500, 'Photo cannot exceed 500 characters']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        minlength: [2, 'Brand must be at least 2 characters'],
        maxlength: [50, 'Brand cannot exceed 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        enum: {
            values: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"],
            message: 'Invalid category. Must be one of: {VALUE}'
        },
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    inStock: { type: Boolean, required: [true, 'InStock status is required'] },
    isDeleted: { type: Boolean, default: false }
},
    {
        timestamps: true,
    }
);

stationaryProductSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})

stationaryProductSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})


export const stationaryProductModel = model<StationaryProduct>('StationaryProduct', stationaryProductSchema)