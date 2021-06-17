import { useEffect } from 'react';
import { Box, Image } from "@chakra-ui/react";
import { getBoundingBox } from '../../utils/utils';

const FaceRecognition = ({ imageUrl, box, displayFaceBox, face }) => {

  useEffect(() => {
    function handleResize(){
      displayFaceBox(getBoundingBox(face));
    }
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  });

  return (
    <Box width={["100%", "80%", "70%", "60%"]} position='relative' margin='auto' >
      <Box  my='5'>
        <Image id="inputimg" src={imageUrl}  w="100%" h="auto" />
        {
          box && face ? 
            <div
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
                ...bounding_box
              }}
            /> 
            :
            null
        }
      </Box>
    </Box>
  );
};

const bounding_box = {
  position: "absolute",
  boxShadow: "0 0 0 3px #149df2 inset",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  cursor: "pointer"
}


export default FaceRecognition;
