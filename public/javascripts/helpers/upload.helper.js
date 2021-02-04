const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const relativePath = path.relative(process.cwd(), path.dirname(__filename));
        const dirPath = path.join(relativePath, "../../uploads");
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.png`);
    }
})

const uploadFile = multer({ storage: storage }).single("image");

module.exports = { uploadFile }