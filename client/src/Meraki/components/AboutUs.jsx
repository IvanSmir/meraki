import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

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
                        Sobre Nosotros
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            mb: 2,
                            textAlign: 'center',
                            fontSize: '1.25rem',
                        }}
                    >
                        En Meraki, transformamos tus visiones de estilo en realidades tangibles. Somos un equipo apasionado por la moda y el diseño, con una profunda dedicación al arte de la costura.
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            mb: 2,
                            textAlign: 'center',
                        }}
                    >
                        Desde nuestros inicios, hemos estado comprometidos con la excelencia en todos los aspectos de nuestra producción. Cada pieza es el resultado de un meticuloso proceso de creación, donde cada detalle cuenta y cada diseño habla por sí mismo.
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            mb: 4,
                            textAlign: 'center',
                        }}
                    >
                        Explora lo que Meraki tiene para ofrecer y déjanos ayudarte a dar vida a tu visión de estilo.
                    </Typography>
                    <Container sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/products')}
                            sx={{ display: 'block' }}
                        >
                            Conoce nuestros Productos
                        </Button>
                    </Container>
                </Container>

            </Box>
        </Box >
    );
};

export default AboutUs;
