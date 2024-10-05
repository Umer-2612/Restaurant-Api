import { Request, Response, NextFunction } from "express";
import { Readable } from "stream";
import cloudinary from "./configuration";
import upload from "../multer/index";

// Middleware to handle file upload and directly upload to Cloudinary
export const uploadToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Use multer's single file upload handler for the "image" field
  upload.single("file")(req, res, async (err: any) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Multer upload failed", details: err });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    try {
      // Convert the file buffer into a readable stream
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null); // End of the stream

      // Upload stream to Cloudinary
      const streamUpload = (stream: Readable): Promise<any> => {
        return new Promise((resolve, reject) => {
          const streamLoad = cloudinary.uploader.upload_stream(
            { folder: "menu" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          stream.pipe(streamLoad);
        });
      };

      // Wait for the upload to complete
      const result = await streamUpload(bufferStream);

      // Attach the Cloudinary URL to the request body
      req.body.filePath = result.secure_url;

      next();
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res
        .status(500)
        .json({ error: "Cloudinary upload failed", details: error });
    }
  });
};
