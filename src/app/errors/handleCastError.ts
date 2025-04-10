import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const statusCode = 400
    const errorSources: TErrorSources = [{
        path: err?.path,
        message: err?.message
    }]
    return { statusCode, message: "Invalid Credential", errorSources }
}

export default handleCastError