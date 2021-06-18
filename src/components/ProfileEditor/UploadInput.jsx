import { Box, Input, Button, Text } from '@chakra-ui/react';
import { useRef } from 'react';

const UploadButton = ({handleNewImage}) => {
    const fileInput = useRef(null);
    return ( 
        <Box pt={3} d='flex' flexDirection='column' alignItems='center'>
            <Input 
                ref={fileInput} 
                name="newImage" type="file"
                d='none' 
                onChange={handleNewImage} 
                accept=".jpg, .jpeg, .png" />
            <Button onClick={() => fileInput.current.click()} colorScheme="blue">upload</Button>
            <Box m="3">
                <Text fontSize="sm" color='gray' fontWeight="bold" >Only jpg or png and 1MB images allowed . </Text>
            </Box>
        </Box>
     );
}
 
export default UploadButton;