import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import MainSpinner from "./components/Spinners/MainSpinner";
import Particles from "react-particles-js";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user-selectors";
import { Box } from '@chakra-ui/react';

const FormContainer = lazy(() => import("./components/Form/FormContainer"));
const HomePage = lazy(() => import("./components/Home/Home"));

const particlesParams = {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 700 } },
  },
};

const App = ({ currentUser }) => {

  return (
    <Box h="100%" 
      w="100%"
      textAlign="center">
      <Particles width="auto" params={particlesParams} id="particles" />
      <Navigation />
      <Switch>
        <Suspense fallback={<MainSpinner />}>
          <Route exact path="/signin" >
            <FormContainer page='signin' />
          </Route>
          <Route exact path="/register" >
            <FormContainer page='register' />
          </Route>
          
          {currentUser ? (
            <Route exact path="/" component={HomePage} />
          ) : (
            <Redirect to="/signin" />
          )}
        </Suspense>
      </Switch>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(App);
