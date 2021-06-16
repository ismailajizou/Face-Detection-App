  import { ModalFooter, Button} from '@chakra-ui/react';

const ModalFtr = ({ onClickSave }) => {
    return ( 
        <ModalFooter>
            <Button colorScheme="purple" onClick={onClickSave}>Submit</Button>
        </ModalFooter>
     );
}
 
export default ModalFtr;