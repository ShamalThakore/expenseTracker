const multer = require("multer")

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
});


// file filter

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null,true)
    }
    else {
        cb(new Error('Only .jpeg, .png and .jpg fromats are allowed'), false);
    }
};

const uploads = multer({ storage, fileFilter});

module.exports = uploads;