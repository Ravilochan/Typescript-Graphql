import React from 'react'
import {Form, Formik} from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'

interface registerProps{}
const Register: React.FC<registerProps>=({})=>{
    return (
        <Wrapper>
        <Formik
        initialValues={{ username:"", password:""}}
        onSubmit={(values)=>{
            console.log(values)
        }}>
            {({isSubmitting})=>(
                <Form>
                    <InputField name="username" placeholder="Enter your Username" label="Username" />
                    <Box mt={4}>
                    <InputField name="password" placeholder="Hush your password" label="Password" type="password" />
                    </Box>
                    <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}> Register </Button>
                </Form>
            )}
        </Formik></Wrapper>
    );
}
export default Register;
