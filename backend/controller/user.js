const { getAllUserService, getUserService, createUserService, updateUserService, deleteUserService, getUserServiceByEmail } = require('../service/user');
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserServiceByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, "jwt_secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



exports.registerUser = async (req, res) => {
  try {
    const data = req.body;
    const { username, email,password} = data;
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
      username,
      email,
      password: hashedPassword,
    };
    const user = await createUserService(userData);

    // userData.save()

    const token = jwt.sign(
      { email: user.email, id: user._id.toString() },
      "jwt_secret",
      { expiresIn: "1h" }
    );    

    return res
      .status(201)
      .json({ message: "User register successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};


exports.getAllUser = async (req, res) => {
    try {
        const users = await getAllUserService()
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserService(userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await createUserService(newUser);
        res.status(201).json(user);                                
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await updateUserService(userId, updatedUser);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await deleteUserService(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}