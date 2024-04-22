import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react';
import PropTypes from 'prop-types';


export const ProductDetails = ({ product }) => {
    const [openDetails, setOpenDetails] = useState(true);

    return (
        <Box
            sx={{
                pb: openDetails ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenDetails(!openDetails)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: 2.5,
                    '&:hover, &:focus': {},
                }}
            >
                <ListItemText
                    primary="Detalles"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openDetails ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 1,
                        transform: openDetails ? 'rotate(-180deg)' : 'rotate(-90deg)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openDetails &&
                Object.keys(product.data).map((key) => (
                    <ListItemText key={key}
                        primary={key + ':'}
                        secondary={product.data[key]}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        sx={{ pl: 2, py: 0, minHeight: 32, color: 'rgba(0,0,0,.8)' }}
                    />
                ))


            }
        </Box>)
}

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired
}
