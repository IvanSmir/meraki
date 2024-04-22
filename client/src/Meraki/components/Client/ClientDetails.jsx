import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Card, CardMedia, Grid, ListItemButton, ListItemText, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react";

export const ClientDetails = ({ client }) => {
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <Grid container spacing={2} sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        image={client.avatar}
                        alt={client.nombre}
                        sx={{
                            height: 350, objectFit: 'contain',
                        }}
                    />
                </Card>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>{client.nombre}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{client.telefono}</Typography>
                <Box sx={{
                    pb: openDetails ? 2 : 0,
                }}>
                    <ListItemButton onClick={() => setOpenDetails(!openDetails)} sx={{
                        px: 3,
                        pt: 2.5,
                        pb: 2.5,
                        '&:hover, &:focus': {},
                    }}>
                        <ListItemText
                            primary="Medidas:"
                            primaryTypographyProps={{
                                fontSize: 15,
                                fontWeight: 'medium',
                                lineHeight: '20px',
                                mb: '2px',
                            }}


                        />
                        <KeyboardArrowDown sx={{ transform: openDetails ? 'rotate(0deg)' : 'rotate(-90deg)', transition: '0.2s' }} />
                    </ListItemButton>
                    {openDetails && client.medidas.map((medida, index) => (
                        <ListItemText key={index}
                            primary={medida.nombre + ':'}
                            secondary={medida.valor}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                            sx={{ pl: 2, py: 0, minHeight: 32, color: 'rgba(0,0,0,.8)' }}
                        />
                    ))}
                </Box>
            </Grid>
        </Grid>
    )
}

ClientDetails.propTypes = {
    client: PropTypes.object.isRequired
}
