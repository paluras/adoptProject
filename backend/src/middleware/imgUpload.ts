
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage }).single('image');