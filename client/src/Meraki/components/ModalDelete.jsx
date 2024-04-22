
import { Box, Button, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { HttpActionsClients, HttpActionsProducts, HttpActionsPrices } from '../utils';
import { useNavigate } from 'react-router-dom';


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

const { deleteClient } = HttpActionsClients();
const { deleteProduct } = HttpActionsProducts();
const { deletePrice } = HttpActionsPrices();

export const ModalDelete = ({ tipo, nombre, id, handleClose, open, removeProducts }) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        try {
            if (tipo === 'cliente') {
                deleteClient(id);
                navigate('/clients')
            }
            if (tipo === 'producto') {
                deleteProduct(id);
                navigate('/products')
            }
            if (tipo === 'precio') {
                deletePrice(id);
                removeProducts(id);
                handleClose();
            }
        }
        catch (error) {
            console.error(error)
        }

    };



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmar Eliminación
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ¿Estás seguro de que deseas eliminar el {tipo}: {nombre}?
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

ModalDelete.propTypes = {
    tipo: PropTypes.string,
    nombre: PropTypes.string,
    id: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    removeProducts: PropTypes.func
};