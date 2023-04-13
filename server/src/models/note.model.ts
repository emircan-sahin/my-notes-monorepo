import { Document, ObjectId, Schema, model } from "mongoose";

export interface INote extends Document {
    userId: ObjectId;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export const Note = model<INote>('Note', noteSchema);