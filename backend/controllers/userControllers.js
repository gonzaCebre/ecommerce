import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

//@description    Auth users & get token
//@route    POST /api/users/login
//@access    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  
    console.log(token)
  
    // Set JWT as HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
      domain: "https://frontend-delta-rouge-29.vercel.app/"
    });

/*     // Para desarrollo
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    }); */

    /* generateToken(res, user._id);  */

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); // Error 'no autorizado'
    throw new Error("Invalid email or password");
  }
});

//@description    Register user
//@route    POST /api/users
//@access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Error 'no autorizado'
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

//@description    Logout user / clear cookie
//@route    POST /api/users/logout
//@access    Private
const logoutUser = asyncHandler(async (req, res) => {
  //Limpia el token de las cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Log out succesfully" });
});

//@description    Get user profile
//@route    GET /api/users/profile
//@access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@description    Update user profile
//@route    PUT /api/users/profile
//@access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); //Guarda el usuario en la database

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@description    Get users
//@route    GET /api/users/profile
//@access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}); //Obtiene todo los users al no filtrar nada
  res.status(200).json(users)
});

//@description    Get user by ID
//@route    GET /api/users/:id
//@access    Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); //No necesitamos que tambien nos traiga el password

  if(user){
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

//@description    Delete user
//@route    DELETE /api/users/:id
//@access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(user){
    if(user.isAdmin){
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.deleteOne({_id: user._id})
    res.status(200).json({message: 'User deleted successfully'})
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description    Update user
//@route    PUT /api/users/:id
//@access    Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else{
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
