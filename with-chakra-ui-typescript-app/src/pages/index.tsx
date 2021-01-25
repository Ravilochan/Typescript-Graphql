import {
  Text,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

const Index = () => (
  <Container height="100vh">
    <Navbar />
    <DarkModeSwitch />
    <Footer>
      <Text>Built with ❤️ Ravilochan</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
