import { useState } from "react";
import MainSpinner from "../Spinners/MainSpinner";
import {apiURL} from '../../utils/utils'
import axios from "axios";
import { Flex } from "@chakra-ui/layout";
import FormContent from "./FormContent";
import { useHistory } from "react-router";
import Toast from "../Toast/Toast";
import { setItem, useUser } from "../../context/userContext";

const FormContainer = ({ page }) => {
    const history = useHistory();
    const { setCurrentUser } = useUser();
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
                setItem('user', res.data.user);
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
        <Flex as="form" onSubmit={onSubmitSendInfo} {...stylesheet.formStyles}>
            <FormContent page={page} onInputChange={onInputChange}/>
        </Flex>
    );
}

const stylesheet = {
    formStyles: {
        border: "1px solid rgba(0, 0, 0, .1)",
        borderRadius: "xl",
        width: ["90%","70%","40%","30%" ,"20%"] ,
        marginX: 'auto',
        padding: '8',
        marginY: '7rem',
        boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )',
        direction: 'column' 
    }
}
 
export default FormContainer;
