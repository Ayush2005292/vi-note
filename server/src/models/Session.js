import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true }, title: { type: String, required: true, trim: true, default: "Untitled Session" }, content: { type: String, default: "" }, wordCount: { type: Number, default: 0 }, startTime: { type: Date, required: true }, endTime: { type: Date, default: null }, duration: { type: Number, default: 0 }, tags: { type: [String], default: [] }, lastEditedAt: { type: Date, default: Date.now } }, { timestamps: true });
sessionSchema.index({ title: "text", content: "text", tags: "text" });
export const Session = mongoose.model("Session", sessionSchema);
