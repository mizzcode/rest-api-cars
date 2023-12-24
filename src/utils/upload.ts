import { v2 as cloudinary } from 'cloudinary'
import path from 'node:path'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

export interface CustomFile {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
}

export interface CustomUploadApiResponse {
    url: string
}

export async function uploadCloudinary(file?: CustomFile): Promise<string | undefined> {
    if (file != null) {
        const upload = await cloudinary.uploader.upload(path.join(__dirname, '..', 'uploads', file.originalname), {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        })
        return (upload as CustomUploadApiResponse).url
    }
    return undefined
}
