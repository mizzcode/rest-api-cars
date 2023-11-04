import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import upload from './multer';
import cloudinary from './cloudinary';
import { Model } from 'objection';
import { db } from './db/db';

const app: Express = express();
const port = process.env.PORT || 4000;

// connect db postgres client
Model.knex(db);

app.use(express.json());

app.post('/cars', upload.single('image'), (req: Request, res: Response) => {
    // mengubah file upload data biner/bytes menjadi format base64
    const fileBase64 = req.file?.buffer.toString('base64');
    // format data uri
    const file = `data:${req.file?.mimetype};base64,${fileBase64}`;
    // cloudinary - cloud storage
    cloudinary.uploader
        .upload(file, {
            resource_type: 'image',
            public_id: 'cars',
            tags: ['car rental', 'rental car'],
        })
        .then((result) => res.json(result));
});

app.listen(port, () => {
    console.log(`server listen on http://localhost:${port}`);
});
