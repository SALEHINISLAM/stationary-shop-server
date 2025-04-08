import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import { USER_ROLE, USER_ROLE_TYPE } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";

const UserSchema = new Schema<TUser,IUserModel>({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [3, 'Email must be at least 3 characters'],
        maxlength: [100, 'Email cannot exceed 100 characters']
    },
    role: {
        type: String,
        enum: {
            values: Object.values(USER_ROLE),
            message: "{VALUE} is not a valid role",
        },
        required: [true, "User role is required"],
        default: USER_ROLE_TYPE.user
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    passwordChangedAt: {
        type: Date,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password;
                delete ret.__v;
                return ret
            }
        }
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_NUM))
    next()
})

UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedAt: Date,
    jwtIssuedAt: number
) {
    if (passwordChangedAt) {
        // Convert passwordChangedAt to seconds (to match JWT iat format)
        const changedAt = Math.floor(passwordChangedAt.getTime() / 1000);
        return jwtIssuedAt < changedAt; // True = Token is invalid
    }
    return false; // False = Token is valid (password never changed)
};

UserSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    if (!plainTextPassword || !hashedPassword) {
        throw new AppError(400,'Both password and hash are required for comparison');
      }
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const UserModel = model<TUser,IUserModel>("User", UserSchema);