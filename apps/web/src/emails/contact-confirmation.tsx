import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ContactConfirmationEmailProps {
  name: string
}

export function ContactConfirmationEmail({ name }: ContactConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting MedSupply Uganda</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Contacting Us</Heading>
          
          <Text style={text}>
            Dear {name},
          </Text>

          <Text style={text}>
            Thank you for reaching out to MedSupply Uganda. We have received your message 
            and will get back to you within 24 hours.
          </Text>

          <Text style={text}>
            Our team is committed to providing you with the best medical equipment and 
            supplies for your healthcare facility.
          </Text>

          <Section style={contactSection}>
            <Text style={contactTitle}>Contact Information:</Text>
            <Text style={contactText}>
              Email: info@biomedengsug.org<br />
              Phone: +256 XXX XXX XXX<br />
              Address: Kampala, Uganda
            </Text>
          </Section>

          <Text style={footer}>
            Best regards,<br />
            MedSupply Uganda Team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  padding: '0 40px',
  marginBottom: '16px',
}

const contactSection = {
  padding: '24px 40px',
  backgroundColor: '#f6f9fc',
  margin: '24px 0',
}

const contactTitle = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px',
}

const contactText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
}

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '0 40px',
  marginTop: '32px',
}
