import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

interface NavbarProps {}
export const Navbar:React.FC<NavbarProps> = ({}) =>{
    const [{data, fetching}] = useMeQuery()
    let body = null
    if(fetching){

    }
    else if(data?.me){
        body =(
            <>
            <Box ml={4}>{data?.me.username}</Box>
            <Button colorScheme="teal"> LogOut</Button>
            </>
        )
    } else {
        body =(
            <>
            <NextLink href="/login">
            <Link> Login </Link>
            </NextLink>
            <NextLink href="/register">
            <Link> Register </Link>
            </NextLink>
            </>
        )
    }
    return (
        <Flex p={4}>
        <Box ml={"auto"}>
            {body}
        </Box>
        </Flex>
    )
} 
