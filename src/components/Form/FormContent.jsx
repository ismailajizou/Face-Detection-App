import React from 'react';
import { Link } from "react-router-dom";
import { Button, Input, FormControl, FormLabel, Heading } from "@chakra-ui/react";


const FormContent = ({page, onInputChange}) => {
    let fields = ["Email", "Password"];
    if(page === "register"){
        fields.unshift("Name");
    }
    
    return ( 
        <>
            <Heading fontFamily="inherit">
                {page.charAt(0).toUpperCase() + page.slice(1)}
            </Heading>
            {
                fields.map((field, i) => (
                    <FormControl pt={4}  key={i}>
                        <FormLabel fontSize='lg'>{field}</FormLabel>
                        <Input 
                            type={field === "Name" ? "text" : field.toLowerCase()} 
                            name={field.toLowerCase()} 
                            borderColor='black' 
                            onChange={onInputChange}
                        />
                    </FormControl>
                ))
            }

            <Button 
                colorScheme="WhiteAlpha"  
                color='black' 
                borderColor="black" 
                variant='outline'
                alignSelf='center' 
                marginY='4'
                type='submit'
            >
            Submit
            </Button>
            {
                page === 'signin' ?
                <Link to="/register">
                    <Button variant='link' color="black">
                        register
                    </Button>
                </Link> 
                :
                null
            }

      </>
    );
}
 
export default FormContent;