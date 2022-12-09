import {v2 as cloudinary} from "cloudinary";
cloudinary.config({
  cloud_name: "dcbzwdyno",
  api_key: "878172282577288",
  api_secret: "fG-7GfMrpXRURKPPwU2wjzCghWc",
});
export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
