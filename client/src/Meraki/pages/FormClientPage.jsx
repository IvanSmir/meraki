import { Grid, Typography } from "@mui/material"
import { ClientForm } from "../components"
import { useParams } from "react-router-dom"

export const FormClientPage = () => {
    const title = useParams().id ? 'Editar Cliente' : 'Agregar Cliente'


    return (
        <Grid container spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}>
            <Grid item
                className="box-shadow"
                xs={12}
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 2 }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                <ClientForm />


            </Grid>
        </Grid >

    )
}
