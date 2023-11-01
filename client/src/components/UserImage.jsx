import { Box } from "@mui/material"
import url from "config/url"

const UserImage = ({ image, size="60px" }) => {

  return (
    <Box width={size} height={size}>
      <img 
        src={`${url}/assets/${image}`}
        alt="user" 
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={ size }
        height={ size }
      />
    </Box>
  )
}

export default UserImage