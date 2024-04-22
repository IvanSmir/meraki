import { Box, Button, CircularProgress, FormControlLabel, Modal, Switch, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { HttpActionsProducts } from "../utils/HttpActionsProducts";
import { HttpActionsPrices } from '../utils/HttpActionsPrices'
import PropTypes from 'prop-types';

const { getProducts } = HttpActionsProducts();
const { createPrice } = HttpActionsPrices();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

export const AgregarProducto = ({ id, nombre, open, handleClose, refresh }) => {
    const { formState, onInputChange } = useForm({ clientId: id, price: 0, state: false, productId: '' })
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductChange = (event) => {
        onInputChange({ target: { name: 'productId', value: event.target.value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPrice(formState);
            await refresh();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography variant="h5" color="error">{error.message}</Typography>
                ) : (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                            {nombre}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControlLabel
                                control={<Switch checked={formState.state} onChange={() => {
                                    onInputChange({ target: { name: 'state', value: !formState.state } })
                                }} name="state" />}
                                label="Estado"
                                name="state"
                            />
                            <TextField
                                id="price"
                                label="Precio"
                                type="number"
                                value={formState.price}
                                onChange={onInputChange}
                                name="price"
                            />
                            <FormControl fullWidth>
                                <InputLabel id="product-label">Producto</InputLabel>
                                <Select
                                    labelId="product-label"
                                    id="product-select"
                                    value={formState.productId}
                                    label="Producto"
                                    onChange={handleProductChange}
                                >
                                    {products.map((product) => (
                                        <MenuItem key={product._id} value={product._id}>
                                            {product.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained">Guardar</Button>
                        </form>
                    </>
                )}
            </Box>
        </Modal>
    );
};


AgregarProducto.propTypes = {
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired
};