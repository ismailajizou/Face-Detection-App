import { useState } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user-actions";
import MainSpinner from "../Spinners/MainSpinner";
import {apiURL} from '../../utils/utils'
import axios from "axios";
import { Flex } from "@chakra-ui/layout";
import FormContent from "./FormContent";
import { withRouter } from "react-router";
import Toast from "../Toast/Toast";


const FormContainer = ({history, setCurrentUser, page}) => {
    const [form, setForm] = useState({ name: "", email: "", password: ""});
    const [loading, setLoading] = useState(false);
    const onInputChange = ({target: {name, value}}) => setForm({ ...form, [name]: value });
    
    const onSubmitSendInfo = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${apiURL}/${page}`, form);
            if (res.data.user) {
                setCurrentUser(res.data.user);
                setLoading(false);  
                history.push("/");
            }
        } catch(err){
            setLoading(false);
            Toast('Error occured', 'error', err.response.data.msg);
        }
    };    


        return ( 
            loading ? 
            <MainSpinner />
            :
            <Flex as="form" 
            border="1px solid rgba(0, 0, 0, .1)"
            borderRadius="xl"
            w={["90%","70%","40%","30%" ,"20%"]}
            margin='auto'
            padding='8'
            marginY='7rem'
            boxShadow='4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'
            direction='column' 
            onSubmit={onSubmitSendInfo}
            >

                <FormContent 
                    page={page} 
                    onInputChange={onInputChange}
                />

            </Flex>
         );
}
 
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});
export default withRouter(connect(null, mapDispatchToProps)(FormContainer));
