import { Button, Grid } from "@mui/material"
import { ItemCard } from "../ItemCard"
import PropTypes from 'prop-types';
import { useState } from "react";
import { ModalProducts } from "./ModalProducts";

export const ClientProducts = ({ products, setToDelete, setOpenDelete, setOpenAdd, isPublic }) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({ nombre: '', imagen: '', id: '' });
    const [price, setPrice] = useState(0)
    const [estado, setEstado] = useState(false)



    const handleOpen = ({ nombre, precio, imagen, estado, id }) => {
        setProduct({ nombre, imagen, id });
        setPrice(precio);
        setEstado(estado);
        setOpen(true);
    }

    const handleDelete = (id, nombre) => {
        setToDelete({ id, tipo: 'precio', nombre });
        setOpenDelete(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <Grid container spacing={2} sx={{ p: 2, display: 'flex', justifyContent: 'center' }} >
            {!isPublic &&

                <Grid item xs={12}>
                    <h2>Pedidos</h2>
                    <Button variant="contained" onClick={setOpenAdd}>Agregar Producto</Button>
                </Grid>
            }
            <Grid item container xs={12} spacing={2} justifyContent="center">
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ItemCard
                            title={product.nombre}
                            id={product._id}
                            image={product.imagen}
                            callback={handleOpen}
                            precio={product.price}
                            estado={product.state}

                            callbackDelete={handleDelete}
                        />
                    </Grid>
                ))}
            </Grid>

            <ModalProducts
                product={product}
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
                price={price}
                setPrice={setPrice}
                estado={estado}
                setEstado={setEstado}
                isPublic={isPublic}
            />

        </Grid >

    )
}

ClientProducts.propTypes = {
    products: PropTypes.array,
    setToDelete: PropTypes.func,
    setOpenDelete: PropTypes.func,
    setOpenAdd: PropTypes.func,
    isPublic: PropTypes.bool
}
