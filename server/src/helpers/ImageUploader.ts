/* eslint-disable object-shorthand */
import { AppResponse } from 'interfaces/response.model';
import BuildAppResponse from 'modules/Response/AppResponse';
import ResponseError from 'modules/Response/ResponseError';
import multer from 'multer'
import sharp from 'sharp'
import { deleteUserPic } from './File';

const multerStorage = multer.memoryStorage();
const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  dest: './public/profile/'
});
const uploadFiles = upload.single("profile"); // limit to 1 image
const uploadImages = (req: any, res: any, next: any) => {
  uploadFiles(req, res, (err: any) => {
    if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
      if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
        throw new ResponseError.BadRequest('please send just 1 pic!')
      }
    } else if (err) {
      throw new ResponseError.BadRequest(err)
    }
    // Everything is ok.
    next();
  });
};
const resizeImages = async (req: any, res: any) => {
  if (!req.file) {
    const badResult = BuildAppResponse.appResponse({ code: 401, isSuccessfull: false, message: 'Profile Pic did not send correctly !' })
    return res.status(badResult.code).send(badResult);
  }


  req.body.images = [];
  const userId = req.getBody('userId')
  if (!userId) {
    const badResult = BuildAppResponse.appResponse({ code: 401, isSuccessfull: false, message: 'Please send user Id with form data !' })
    return res.status(badResult.code).send(badResult);
  }
  deleteUserPic(userId)
  const newFilename = `${userId}.jpg`;
  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/profile/${newFilename}`);
  req.body.images.push(newFilename);
  const result = BuildAppResponse.appResponse({ code: 200, isSuccessfull: true, message: "profice pic successfully uploaded !" })
  return res.status(result.code).send(result);
};

const getResult = async (req: any, res: any) => {
  if (req.body.images && req.body.images.length === 0) {
    return BuildAppResponse.appResponse({ isSuccessfull: false, message: 'You must select at least 1 image.' } as AppResponse)
  }

  return BuildAppResponse.appResponse({ isSuccessfull: true, message: 'Profile picture updated' } as AppResponse)
};
export default {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult
};
