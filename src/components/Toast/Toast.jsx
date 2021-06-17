import { createStandaloneToast } from "@chakra-ui/toast";

const toast = createStandaloneToast();

const Toast = (title, status, description) => toast({
    title,
    description,
    variant: 'solid',
    status,
    isClosable: true,
});

export default Toast;