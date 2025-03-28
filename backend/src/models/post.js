import mongoose from "mongoose";
import moment from "moment-timezone";


const getCurrentDate = () => {
    return moment.tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm");
};

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: String, default: getCurrentDate},
    changed_at: { type: String, default: getCurrentDate},
    is_active: { type: Boolean, default: true }
});

export const Post = mongoose.model('Post', postSchema);
