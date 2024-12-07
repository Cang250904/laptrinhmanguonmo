const User = require('../models/user'); // Đảm bảo tên file là 'user.js'
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Đăng ký người dùng mới
async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Đăng nhập
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Tìm người dùng theo tên đăng nhập
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Tạo JWT token
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Xuất các hàm
module.exports = {
  register,
  login,
};
