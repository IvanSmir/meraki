import { Box, CircularProgress, Divider, Fab, Typography } from "@mui/material"
import { ItemCardList } from "../components"
import { HttpActionsClients } from "../utils/HttpActionsClients"
import { useEffect, useState } from "react"
import { Add } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const { getClients } = HttpActionsClients()


export const ClientsPage = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate('/clients/new')
    }
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients()
                setClients(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchClients()
    }, [])

    if (loading) {
        return <CircularProgress />
    }
    if (error) {
        return <Typography variant="h5" color="error">{error.message}</Typography>
    }

    return (

        <Box sx={{
            display: "flex", justifyContent: 'center'
        }}>
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', height: '100', width: '80vw', justifyContent: 'center' }} >
                <Typography variant="h3" sx={{ mt: 5, mb: 2, ml: 2 }}>Client List</Typography>
                <Divider variant="middle" />
                <ItemCardList content={clients} tipo={'clientes'} />
            </Box>
            <Fab color="secondary" aria-label="add"
                sx={{ position: 'fixed', bottom: { xs: 50, md: 50 }, right: { xs: 10, md: 50 } }}
                onClick={handleAdd}>
                <Add />
            </Fab>
        </Box >
    )
}
