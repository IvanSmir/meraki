import { Card, CardMedia, Grid } from '@mui/material'
import PropTypes from 'prop-types'

export const ProductImages = ({ product }) => {
    return (
        <Grid item container xs={12} md={7} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Card sx={{ maxWidth: 450 }}>
                    <CardMedia
                        component="img"
                        image={product.avatar}
                        alt={product.nombre}
                        sx={{
                            height: 400, objectFit: 'contain',
                        }}
                    />
                </Card>
            </Grid>
            <Grid item container xs={12} spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', mt: 1 }}>
                {product.images?.map((image, index) => (
                    <Grid key={index} item xs={4}>
                        <Card sx={{ maxWidth: 100 }}>
                            <CardMedia
                                component="img"
                                image={image}
                                alt="Product"
                                sx={{
                                    height: 100, objectFit: 'contain',
                                }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Grid>
    )
}

ProductImages.propTypes = {
    product: PropTypes.object.isRequired
}
