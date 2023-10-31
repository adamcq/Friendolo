import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).json({ message: "User with this email does not exist" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ user, token })

  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

export default login