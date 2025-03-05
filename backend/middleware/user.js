const { body, validationResult } = require("express-validator");


const jwt = require("jsonwebtoken");

const AuthUserValidation = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, "jwt_secret");  
    console.log("Decoded JWT:", decoded);  

    req.user = decoded;  
    
    if (!req.user.id) {
      return res.status(400).json({ message: "User ID missing in token" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Token invalid" });
  }
};



const userValidation = [
  body("username").notEmpty().withMessage("Username is required"),
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const userUpdateValidation = [
  body("username").optional().notEmpty().withMessage("Username cannot be empty"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


module.exports = { userValidation, userUpdateValidation, AuthUserValidation };
