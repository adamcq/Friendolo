import { Box } from "@mui/material"

const UserImage = ({ image, size="60px" }) => {
  return (
    <Box width={size} height={size}>
      <img 
        src={`https://technotes-api.onrender.com/assets/${image}`}
        alt="user" 
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={ size }
        height={ size }
      />
    </Box>
  )
}

export default UserImage