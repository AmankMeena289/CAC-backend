import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { log } from "console";

const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user details from request body
  const { fullName, email, username, password } = req.body;

  // 2. Validate that all required fields are present and not empty
  if (
    [fullName, email, username, password].some(
      (field) => field?.trim() === "" || field === undefined
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // 3. Check if user already exists with matching username or email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // 4. Extract local file paths for uploaded files from Multer
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // 5. Validate that avatar file is present
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // 6. Upload files to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  // 7. Create user document in database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // 8. Fetch the newly created user excluding password and refreshToken
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 9. Verify user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 10. Return success response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser };