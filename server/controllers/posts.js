import Post from '../models/Post.js'
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)
    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })

    const posts = await Post.find().exec()
    res.status(201).json(posts)

  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const {userId} = req.params 
    const posts = await Post.find({ userId })
    res.status(200).json(posts)

  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params 
    const { userId } = req.body
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)
    
    isLiked 
      ? post.likes.delete(userId)
      : post.likes.set(userId, true)

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )
    res.status(200).json(updatePost)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}