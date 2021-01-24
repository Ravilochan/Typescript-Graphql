import React from 'react'
import {Form, Formik} from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { toErrorMap } from '../utils/toErrorMap'
import {useRouter} from 'next/router'
import { useLoginMutation } from '../generated/graphql'


const Login: React.FC<{}>=({})=>{
  const router = useRouter()
    const [,login] = useLoginMutation()
    return (
        <Wrapper variant="small">
        <Formik
        initialValues={{ username:"", password:""}}
        onSubmit={async (values, {setErrors})=>{
            const response = await login(values)
            if(response.data?.login.errors){
              setErrors(toErrorMap(response.data?.login.errors))
            }else if(response.data?.login.user){
              router.push('/')
            }
        }}>
            {({isSubmitting})=>(
                <Form>
                    <InputField name="username" placeholder="Choose your Username" label="Username" />
                    <Box mt={4}>
                    <InputField name="password" placeholder="Hush your password" label="Password" type="password" />
                    </Box>
                    <Button type="submit" colorScheme="teal" mt={4} isLoading={isSubmitting}> Login </Button>
                </Form>
            )}
        </Formik></Wrapper>
    );
}
export default Login;
