const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const { storage } = require("../configs/firebase.config");

const sharp = require("sharp");

module.exports = {
  uploadFile: async (file) => {
    const fileBuffer = await sharp(file.buffer)
      .resize(800, 800, {
        fit: "inside",
      })
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();
    const fileRef = ref(storage, `file/${file.originalname} ${Date.now()}`);
    const fileMetadata = {
      contentType: file.mimetype,
    };

    const fileUploadPromise = uploadBytesResumable(
      fileRef,
      fileBuffer,
      fileMetadata
    );

    await fileUploadPromise;
    const fileDownloadURL = await getDownloadURL(fileRef);
    return { ref: fileRef, downloadUrl: fileDownloadURL };
  },
};
