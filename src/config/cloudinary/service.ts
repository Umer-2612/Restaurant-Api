import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

class CloudinaryService {
  async destroy(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
}

export default CloudinaryService;
