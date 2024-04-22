import { Container, Typography, Button, Box } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const ContactUS = () => {
    const whatsappNumber = "+1234567890";
    const whatsappMessage = encodeURIComponent("Hola, me gustaría saber más sobre sus productos y servicios.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <Box sx={{
            display: "flex", justifyContent: 'center', mt: 2
        }}>
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', width: '80vw', height: '100vh' }} >

                <Container maxWidth="xl">
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            textAlign: 'center',
                            fontSize: {
                                xs: '3rem',
                                sm: '3.5rem',
                                md: '4rem',
                            }
                        }}
                    >
                        Contáctanos
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            mb: 4,
                            textAlign: 'center',
                            fontSize: '1.25rem',
                        }}
                    >
                        Si tienes alguna consulta o necesitas más información, no dudes en contactarnos.
                    </Typography>


                    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                mb: 2,
                                textAlign: 'center',
                            }}
                        >
                            Contáctanos por WhatsApp
                        </Typography>

                        <Button
                            variant="contained"
                            href={whatsappLink}
                            target="_blank"
                            sx={{ width: '70px', height: '50px', justifyContent: 'center', display: 'flex' }}
                        >

                            <WhatsAppIcon />
                        </Button>
                    </Container>
                </Container>
            </Box>
        </Box >
    );
};


