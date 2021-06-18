import { Box, Image } from '@chakra-ui/react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
    
    return (
        <Box m="1rem 2rem" w="9rem" h='9rem'>
            <Tilt style={{
                background: 'linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)',
                height: '90%', 
                width: '90%',
                border: '1px solid white',
                borderRadius: '0.6rem'
            }}>
                <Box display='flex' alignItems='center' justifyContent='center' h='100%' w="100%">
                    <Image src={brain} />
                </Box>
            </Tilt>
        </Box>
    );
}
export default Logo;