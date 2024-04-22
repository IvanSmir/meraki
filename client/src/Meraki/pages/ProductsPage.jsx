import { Box, CircularProgress, Divider, Fab, Typography } from "@mui/material"
import { ItemCardList } from "../components"
import { Add } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { HttpActionsProducts } from "../utils/HttpActionsProducts"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Auth/context"

const { getProducts } = HttpActionsProducts()

export const ProductsPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search')
    const { authState } = useContext(AuthContext);
    const logged = authState.isAuthenticated;
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const handleAdd = () => {
        navigate('/products/new')
    }

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const data = await getProducts(searchParam)
                setProducts(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [searchParam])

    if (loading) {
        return <CircularProgress />
    }

    if (error) {
        return <Typography variant="h5" color="error">{error.message}</Typography>
    }

    return (

        <Box sx={{
            display: "flex", justifyContent: 'center',
        }}>
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', height: '100', width: '80vw', justifyContent: 'center' }} >
                <Typography variant="h3" sx={{ mt: 5, mb: 2, ml: 2 }}>Products List</Typography>
                <Divider variant="middle" />
                <ItemCardList content={products} tipo={'producto'} />
            </Box>
            {logged &&
                <Fab color="secondary" aria-label="add"
                    sx={{ position: 'fixed', bottom: { xs: 50, md: 50 }, right: { xs: 50, md: 50 } }}
                    onClick={handleAdd}>
                    <Add />
                </Fab>
            }
        </Box >

    )
}
