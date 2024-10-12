import { v2 as cloudinary } from "cloudinary";
import Config from "../env";

cloudinary.config({
  cloud_name: Config.cloudinaryConfig.cloudName,
  api_key: Config.cloudinaryConfig.apiKey,
  api_secret: Config.cloudinaryConfig.apiSecret,
});

export default cloudinary;
