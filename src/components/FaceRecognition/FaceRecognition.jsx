import { Box, Image } from "@chakra-ui/react";
import BoundingBox from "../BoundingBox/BoundingBox";

const FaceRecognition = ({ imageUrl, faces }) => {

  return (
    <Box width={["100%", "80%", "70%", "60%"]} position='relative' margin='auto' >
      <Box  my='5'>
        <Image id="inputimg" src={imageUrl}  w="100%" h="auto" />
        {
          faces.length ? 
            faces.map((face, i) => <BoundingBox key={i} faceObj={face.region_info.bounding_box} />)
            :
            null
        }
      </Box>
    </Box>
  );
};




export default FaceRecognition;
