import { ModalBody, Avatar, Text, Input, FormLabel, FormControl, Box } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';

const AccountModalContent = ({ currentUser: { name, email, joined, avatar }, deleteMode, handleChange  }) => {
    return ( 
        <ModalBody display='flex' alignItems='center' flexDirection='column'>
        {
            !deleteMode ?
            (
                <>
                    <Avatar src={avatar} size="xl" mb="5" />
                    <FormControl display='flex' justifyContent='space-between' alignItems='center' mb='5'>
                        <FormLabel m="0">Username</FormLabel>
                        <Input value={name} w="18rem" isReadOnly />
                    </FormControl>
                    <FormControl display='flex' justifyContent='space-between' alignItems='center' mb='5'>
                    <FormLabel m="0">Email</FormLabel>
                        <Input value={email} w="18rem" isReadOnly />
                    </FormControl>
                    <Box textAlign='center' my='4'>
                        <Text fontSize='xl' fontWeight='bold' color='gray'>You're member since :</Text>
                        <Text fontSize='xl' fontWeight='bold' color='gray'>{new Date(joined).toDateString()}</Text>
                    </Box>
                </>
            )
            :
            (
                <>
                    <Text m="3">To delete this Account you must enter your password and hit the delete button.</Text>
                    <Input placeholder='Enter you password' type="password" onChange={(e) => handleChange(e.target.value)} />
                </>
            )
        }
        </ModalBody>
     );
}

const mapStateToProps = createStructuredSelector({ currentUser: selectCurrentUser });
 
export default connect(mapStateToProps)(AccountModalContent);