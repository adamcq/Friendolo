import User from '../models/User.js'

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).exec()
    res.status(200).json(user)
  } catch (err) {
    console.log('sssss')
    res.status(404).json({ error: err.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
  const { id } = req.params
  const user = await User.findById(id).exec()

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id).exec())
  )
  const formattedFriends = friends.map(
    ({_id, firstName, lastName, occupation, location, picturePath}) => 
      ({_id, firstName, lastName, occupation, location, picturePath})
  )

  res.status(200).json(formattedFriends)

  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => 
        ({ _id, firstName, lastName, occupation, location, picturePath })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params
//     const user = await User.findById(id).exec()
//     const friend = await User.findById(friendId).exec()

//     if (!user.friends.includes(friendId)) { 
//       user.friends.push(friendId)
//       friend.friends.push(id)
//     }
//     else {
//       user.friends = user.friends.filter(id => id !== friendId)
//       friend.friends = friend.friends.filter(id => id !== id)
//     }
//     console.log(`user.friends`, user.friends)
//     console.log(`friend.friends`, friend.friends)

//     const formattedFriends = user.friends.map(
//       ({_id, firstName, lastName, occupation, location, picturePath}) => {
//         { _id, firstName, lastName, occupation, location, picturePath }
//       }
//     )
//     console.log('formattedFriends', formattedFriends)

//     res.status(200).json(formattedFriends)

//   } catch (err) {
//     res.status(404).json({ error: err.message })
//   }
// }
