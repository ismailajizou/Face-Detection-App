import { Flex, Button, Input, Text } from '@chakra-ui/react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onBtnSubmit }) => (
    <Flex flexDir='column' alignItems='center' py={6}>
        <Text fontSize="2xl">This magic brain will detect faces in your pictures.</Text>
        <Text fontSize="2xl"> Give it a try !</Text>
        <Flex className='form' p={8} mt={6} borderRadius='2xl' w={["97%", "80%", "70%", "60%"]}>
            <Input placeholder="Enter image url" fontSize='lg' variant="filled" _focus={{backgroundColor: "white"}} onChange={onInputChange} />
            <Button colorScheme="purple" onClick={onBtnSubmit}>Detect</Button>
        </Flex>
    </Flex>
);

export default ImageLinkForm; 
