import { Box, Image } from "@chakra-ui/react";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <Box width='500px' position='relative' margin='auto'>
      <Box position="absolute" mt={4}>
        <Image id="inputimg" src={imageUrl} width="500px" height="auto" />
        <div
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
            ...bounding_box
          }}
        />
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
