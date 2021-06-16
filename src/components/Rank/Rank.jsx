import { Box, Text } from "@chakra-ui/react";

const Rank = ({ name, entries }) => {

return (
    <Box>
        <Text color='white' fontSize='xl'>{`${name}, your current entry count is ...`}</Text>
        <Text color='white' fontSize='5xl'>{entries}</Text>
    </Box>
);
}

export default Rank; 