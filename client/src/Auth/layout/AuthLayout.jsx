import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { MerakiIcon } from '../../ui/components/MerakiIcon'

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid container spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}>

            <Grid item
                className="box-shadow"
                xs={12}
                sx={{ width: { sm: 450 }, backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 2 }}
            >
                <Typography variant="h5" sx={{ mb: 1, textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}> <MerakiIcon />Meraki</Typography>
                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                {children}
            </Grid>
        </Grid>
    )
}


AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
}