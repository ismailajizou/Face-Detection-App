import Navigation from "./components/Navigation/Navigation";
import Particles from "react-particles-js";
import { Box } from '@chakra-ui/react';
import ActualPage from "./ActualPage";

const particlesParams = {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 700 } },
  },
};

const App = () => {
  return (
    <Box h="100%" 
      w="100%"
      textAlign="center">
      <Particles width="auto" params={particlesParams} id="particles" />
      <Navigation />
      <ActualPage />
    </Box>
  );
};

export default App;
