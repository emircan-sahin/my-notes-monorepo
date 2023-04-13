import { Date, Document, ObjectId, Schema, model } from "mongoose";

export interface IUser extends Document {
    id: ObjectId;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);