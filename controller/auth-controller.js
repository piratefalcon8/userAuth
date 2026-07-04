const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ username, email }],
    });
    if (checkExistingUser) {
      const isDuplicateEmail = checkExistingUser.email === "email";
      return res.status(400).json({
        success: false,
        message: isDuplicateEmail
          ? "this email has being chosen"
          : "username has being chosen",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserInfo = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUserInfo.save();
    // 4. Clean up response (don't send the hashed password back to the client!)
    const userData = newUserInfo.toObject();
    delete userData.password;
    if (newUserInfo) {
      return res.status(200).json({
        success: false,
        message: "User registered successfully",
        data: newUserInfo,
      });
    }
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await User.findOne({ email });
    if (!userCredential) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      userCredential.password,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const accessToken = jwt.sign(
      {
        userId: userCredential._id,
        userEmail: userCredential.email,
        userRole: userCredential.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" },
    );

    if (accessToken) {
      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: accessToken,
      });
    }
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const fetchUserId = req.userInfo.userId
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(fetchUserId)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"
        })
        //check wethere the old password match
        const userOldPassword = await bcrypt.compare(oldPassword,user.password)
        if (!userOldPassword){
            return res.status(400).json({
            success:false,
            message:"Password is incorrect"
        })
        }
    }
    //Update password hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedNewPassword = await bcrypt.hash(newPassword,salt)
    user.password = hashedNewPassword
    await user.save()
    res.status(200).json({
        success : false,
        message:"Password updated successfully"
    })
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  changePassword
};
