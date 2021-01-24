import { Box } from "@chakra-ui/react"
import React from "react"
interface WrapperProps {
    variant?: 'small' | 'regular'
}
export const Wrapper:React.FC<WrapperProps>=({children,variant ="regular"})=>(
    <Box maxW={variant === 'regular' ? "800px" : "400px"} w="100%" mx="auto" mt={8}>{children}</Box>
)