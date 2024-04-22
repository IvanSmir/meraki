import { Box, CircularProgress, Fab, Grid, Typography } from "@mui/material"

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HttpActionsProducts } from "../utils/HttpActionsProducts";
import { ProductImages } from "../components/Product/ProductImages";
import { ProductDetails } from "../components/Product/ProductDetails";
import { ProductSize } from "../components/Product/ProductSize";
import { Delete, Edit } from "@mui/icons-material";
import { ModalDelete } from "../components/ModalDelete";
import { AuthContext } from "../../Auth/context";

const obtenerTalas = (tallas) => {
    const tallasDisponibles = Object.keys(tallas).filter(key => tallas[key] === "true");
    for (let i = 0; i < tallasDisponibles.length; i++) {
        tallasDisponibles[i] = tallasDisponibles[i].toUpperCase()
    }
    const textoTallas = tallasDisponibles.join(', ')
    return textoTallas;
}

const { getProduct } = HttpActionsProducts()

export const ProductPage = () => {
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext);
    const logged = authState.isAuthenticated;
    const [open, setOpen] = useState(false);
    const [toDelete, setToDelete] = useState({});
    const handleOpen = ({ nombre, tipo, id }) => {
        setToDelete({ nombre, tipo, id })
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [product, setProduct] = useState({
        _id: '',
        nombre: '',
        avatar: '',
        images: '',
        data: {
            Descripcion: '',
            Precio: '',
            Materiales: '',
        },
        sizeData: {
            Tallas: '',
            Medidas: '',
            Ajuste: '',
            Cuidados: '',
        }
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const id = useParams().id;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProduct(id)
                setProduct({
                    _id: data._id,
                    nombre: data.nombre,
                    avatar: data.avatar,
                    images: data.images,
                    data: {
                        Descripcion: data.description,
                        Precio: data.precio,
                        Materiales: data.materiales,
                    },
                    sizeData: {
                        Tallas: obtenerTalas(data.tallas),
                        Medidas: data.medidas,
                        Ajuste: data.ajuste,
                        Cuidados: data.cuidado,
                    }
                })

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [id]);

    const handleClick = () => {
        navigate(`/products/edit/${id}`)
    }

    const handleClickDelete = () => {
        setOpen(true)
        handleOpen({ nombre: product.nombre, tipo: 'producto', id: product._id })
    }

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
                <Grid container spacing={2} sx={{ p: 2 }} >
                    <ProductImages product={product} />

                    <Grid item xs={12} md={5} lg={6} container spacing={2} justifySelf='start'>
                        <Grid item xs={12}>
                            <Typography variant="h6">{product.nombre}</Typography>
                            <ProductDetails product={product} />
                            <ProductSize product={product} />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
            {logged && <>
                <Fab size="medium" color="error" aria-label="edit"
                    sx={{ position: 'fixed', bottom: 120, right: { xs: 10, md: 50 } }}
                    onClick={handleClickDelete}>
                    <Delete />
                </Fab>

                <Fab color="secondary" aria-label="edit"
                    sx={{ position: 'fixed', bottom: { xs: 50, md: 50 }, right: { xs: 10, md: 50 } }}
                    onClick={handleClick}>
                    <Edit />
                </Fab>
                <ModalDelete tipo={toDelete.tipo} nombre={toDelete.nombre} id={toDelete.id} handleClose={handleClose} open={open} />
            </>
            }
        </Box >

    )
}
