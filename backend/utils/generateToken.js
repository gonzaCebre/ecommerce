import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });

  console.log(token)

  // Set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    /* httpOnly: true, */
    secure: false,
    /* secure: process.env.NODE_ENV !== "development", */
    /* sameSite: "strict", */
    sameSite: "lax",
    maxAge: 60 * 24 * 60 * 60 * 1000, // 30 dias
  });
};

export default generateToken;
