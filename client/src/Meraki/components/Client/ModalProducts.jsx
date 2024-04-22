import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { HttpActionsPrices } from '../../utils/HttpActionsPrices';


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

const { updatePrice } = HttpActionsPrices()

export const ModalProducts = ({ product, handleClose, open, price, setPrice, estado, setEstado, isPublic }) => {
    const { nombre, imagen, id } = product

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            price,
            state: estado
        }
        try {
            updatePrice({ data, id })
            handleClose()
        }
        catch (error) {
            console.error(error)
        }

    }


    if (isPublic) {
        return (<div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        {nombre}
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 3, justifyContent: 'center' }} >
                        <img src={imagen} alt={nombre} style={{ width: '200px' }} />
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Precio: {price}
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        Estado: {estado ? 'Listo' : 'En proceso'}
                    </Typography>
                </Box>
            </Modal>
        </div>)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                        {nombre}
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 3, justifyContent: 'center' }} >
                        <img src={imagen} alt={nombre} style={{ width: '200px' }} />
                    </Box>
                    <form onSubmit={handleSubmit}>

                        <FormControlLabel
                            control={
                                <Switch checked={estado} onChange={() => setEstado(!estado)} name="state" />
                            }
                            label="Estado"
                        />
                        <TextField
                            id="precio"
                            label="Precio"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value * 1)}
                        />
                        <Button type="submit" variant="contained">Guardar</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

ModalProducts.propTypes = {
    product: PropTypes.object,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func,
    open: PropTypes.bool,
    setPrice: PropTypes.func,
    estado: PropTypes.bool,
    setEstado: PropTypes.func,
    price: PropTypes.number,
    isPublic: PropTypes.bool
}