  import { ModalFooter, Button} from '@chakra-ui/react';

const ModalFtr = ({ onClickSave, loading }) => {
    return ( 
        <ModalFooter>
            <Button 
              colorScheme="purple" 
              onClick={onClickSave} 
              isLoading={loading} 
              loadingText='Submitting'
              >Submit
              </Button>
        </ModalFooter>
     );
}
 
export default ModalFtr;