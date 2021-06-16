import { createStandaloneToast } from "@chakra-ui/toast";

const Toast = (title, status, description) => createStandaloneToast()({
    title,
    description,
    variant: 'solid',
    status,
    isClosable: true,
});

export default Toast;