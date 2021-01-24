import {
  Text,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container height="100vh">
    <DarkModeSwitch />
    <Footer>
      <Text>Built with ❤️ Ravilochan</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
