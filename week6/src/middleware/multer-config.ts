import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        const uniqueSuffix = uuidv4();
        const newFilename = `${originalName}_${uniqueSuffix}${extension}`;
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

export default upload;