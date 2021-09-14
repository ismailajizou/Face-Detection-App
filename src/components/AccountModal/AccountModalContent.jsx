import { ModalBody, Avatar, Text, Input, FormLabel, FormControl, Box } from '@chakra-ui/react';
import {useUser} from '../../context/userContext';

const AccountModalContent = ({ deleteMode, handleChange  }) => {
    const { currentUser } = useUser()
    return ( 
        <ModalBody display='flex' alignItems='center' flexDirection='column'>
        {
            !deleteMode ?
            (
                <>
                    <Avatar src={currentUser.avatar} size="xl" mb="5" />
                    <FormControl display='flex' justifyContent='space-between' alignItems='center' mb='5'>
                        <FormLabel m="0">Username</FormLabel>
                        <Input value={currentUser.name} w="18rem" isReadOnly />
                    </FormControl>
                    <FormControl display='flex' justifyContent='space-between' alignItems='center' mb='5'>
                    <FormLabel m="0">Email</FormLabel>
                        <Input value={currentUser.email} w="18rem" isReadOnly />
                    </FormControl>
                    <Box textAlign='center' my='4'>
                        <Text fontSize='xl' fontWeight='bold' color='gray'>You're member since :</Text>
                        <Text fontSize='xl' fontWeight='bold' color='gray'>{new Date(currentUser.joined).toDateString()}</Text>
                    </Box>
                </>
            )
            :
            (
                <>
                    <Text m="3">To delete this Account you must enter your password and hit the delete button.</Text>
                    <Input placeholder='Enter you password' borderColor='black'  type="password" onChange={(e) => handleChange(e.target.value)} />
                </>
            )
        }
        </ModalBody>
     );
}
 
export default AccountModalContent;