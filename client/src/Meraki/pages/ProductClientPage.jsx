import { Box, CircularProgress, Divider, Typography } from "@mui/material"
import { ClientProducts } from "../components"
import { useLocation, } from "react-router-dom"
import { useEffect, useState } from "react"
import { HttpActionsClients } from "../utils"
const { getProductsFronClientByNumber } = HttpActionsClients()



export const ProductClientPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const number = params.get('search')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const productsData = await getProductsFronClientByNumber(number);
                setProducts(productsData)
            } catch (error) {
                setError(error)

            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [number])

    if (loading) {
        return <CircularProgress />
    }


    return (

        <Box sx={{
            display: "flex", justifyContent: 'center',
        }}>
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', height: '100', width: '80vw', justifyContent: 'center' }} >
                <Typography variant="h3" sx={{ mt: 5, mb: 2, ml: 2 }}>Products List of {number}</Typography>
                <Divider variant="middle" />
                {!error ? <ClientProducts products={products} isPublic /> : <Typography variant="h5" color="error" textAlign={'center'}>No se han encontrado productos de {number}</Typography>}
            </Box>
        </Box >

    )
}
