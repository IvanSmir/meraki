import { Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const MainContent = () => {
    const navigate = useNavigate()
    return (
        <Container maxWidth="xl">
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    mb: 2,
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textAlign: 'center',
                    fontSize: {
                        xs: '4rem',
                        sm: '5rem',
                        md: '6rem',
                    }
                }}

            >
                Meraki
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    mb: 2,
                    textAlign: 'center',
                    fontSize: '1.5rem',
                }}
            >
                Bienvenido a Meraki
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    mb: 2,
                    textAlign: 'center',
                }}
            >
                Bienvenido a Meraki, donde tu visión de estilo se transforma en realidad.
                Con años de experiencia en el arte de la costura, Meraki ofrece una experiencia de moda única,
                creando prendas a medida que destacan por su calidad y ajuste perfecto. Descubre cómo podemos diseñar y
                confeccionar el atuendo perfecto para cualquier ocasión
            </Typography>
            <Container sx={{ display: 'flex', justifyContent: 'space-around', mb: 5 }}>

                <Button variant="contained" onClick={() => navigate('/products')} sx={{ display: 'block', margin: 'auto' }}>
                    Descubre nuestros productos
                </Button>
            </Container>

        </Container>
    )
}
