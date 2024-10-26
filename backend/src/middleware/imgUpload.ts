import multer from "multer";
import path from "path";
import fs from "fs";

// Define the upload directory
// eslint-disable-next-line no-undef
const uploadDir = path.join(__dirname, '..', 'uploads');

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        // Use Date.now() to ensure unique file names
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

// Create the multer upload middleware
export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    // eslint-disable-next-line consistent-return
    fileFilter: (req, file, callback): void => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add any other types as needed
        if (!allowedTypes.includes(file.mimetype)) {

            return callback(null, false);
        }
        callback(null, true);
    },
}).array('images', 5);