import multer from 'multer';

// menyimpan file upload ke dalam memory
const storage = multer.memoryStorage();

export default multer({ storage });
