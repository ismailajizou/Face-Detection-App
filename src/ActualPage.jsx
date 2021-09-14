import { lazy, Suspense } from "react";
import MainSpinner from "./components/Spinners/MainSpinner";
import { Redirect, Route, Switch } from "react-router-dom";
import { useUser } from "./context/userContext";

const FormContainer = lazy(() => import("./components/Form/FormContainer"));
const HomePage = lazy(() => import("./components/Home/Home"));

const ActualPage = () => {
    const { currentUser } = useUser();
    return ( 
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
    );
}
 
export default ActualPage;