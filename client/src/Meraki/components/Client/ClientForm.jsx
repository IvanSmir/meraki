import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "../../../hooks"
import { useContext, useEffect, useState } from "react"
import { HighlightOff } from "@mui/icons-material"
import { HttpActionsClients } from "../../utils/HttpActionsClients"
import * as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../Auth/context"
import { HttpActions } from "../../../Auth/utils/HttpActions"


const { logoutAuth } = HttpActions()

const schema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es requerido').min(5, 'El nombre debe tener al menos 5 caracteres'),
    telefono: Yup.string().required('El campo telefono es requerido').min(8, 'El telefono debe tener al menos 8 caracteres'),
    medidas: Yup.array().of(
        Yup.object().shape({
            nombreMedida: Yup.string().required('El campo nombre de la medida es requerido').min(3, 'El nombre de la medida debe tener al menos 3 caracteres'),
            valorMedida: Yup.string().required('El campo valor de la medida es requerido').min(1, 'El valor de la medida debe tener al menos 1 caracter'),
        })
    )
});

const { createClient, getClient, updateClient } = HttpActionsClients();

export const ClientForm = () => {
    const { logout } = useContext(AuthContext)

    const navigate = useNavigate();
    const id = useParams().id;
    const [error, setError] = useState({ name: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { formState, onInputChange, onResetForm } = useForm({
        nombre: '',
        telefono: '',
        medidas: []
    });

    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                try {
                    const data = await getClient(id);
                    onInputChange({ target: { name: 'nombre', value: data.nombre } });
                    onInputChange({ target: { name: 'telefono', value: data.telefono } });
                    onInputChange({
                        target: {
                            name: 'medidas', value:
                                data.medidas.map(({ nombre, valor }) => { return { nombreMedida: nombre, valorMedida: valor } })
                        }
                    });

                } catch (error) {
                    setError({ name: 'all', message: 'Error al obtener el cliente' });
                }
            }
            fetchClient();
        }
    }, [id, onInputChange]);

    const [images, setImages] = useState([]);
    const handleImageChange = (e) => {
        if (images.length >= 1) return setError({ name: 'images', message: 'Solo se permiten 1 imagen' });
        setImages([...e.target.files]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setError({ name: '', message: '' });
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleChange = (e) => {
        onInputChange(e);
    };

    const handleAddMeasure = () => {
        const newMeasure = { nombreMedida: '', valorMedida: '' };
        formState.medidas.push(newMeasure);
        onInputChange({ target: { name: 'medidas', value: formState.medidas } });
    };

    const handleRemoveMeasure = (index) => {
        const newMeasures = formState.medidas.filter((_, i) => i !== index);
        onInputChange({ target: { name: 'medidas', value: newMeasures } });
    };

    const handleMeasureChange = (index, e) => {
        const newMeasures = [...formState.medidas];
        newMeasures[index][e.target.name] = e.target.value;
        onInputChange({ target: { name: 'medidas', value: newMeasures } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formState.medidas.length >= 1) {
            formState.medidas = formState.medidas.filter((medida) => medida.nombreMedida.trim() !== '' && medida.valorMedida.trim() !== '');
        }
        try {
            schema.validateSync(formState);

        } catch (erros) {
            setError({ name: erros.path, message: erros.message });
            setLoading(false);
            return;
        }
        try {
            const { nombre, telefono } = formState;
            let data;
            if (formState.medidas.length > 0) {
                const medidas = formState.medidas.map(({ nombreMedida, valorMedida }) => ({ nombre: nombreMedida, valor: valorMedida }));
                data = { nombre, telefono, image: images, medidas };
            } else {
                data = { nombre, telefono, image: images };
            }
            if (id) {
                await updateClient(data, id);
                navigate(`/clients/${id}`)
            } else
                await createClient(data);
        } catch (error) {
            if (error.response.status === 401) {
                logout()
                logoutAuth()
                localStorage.setItem('lastPath', '/clients/new');
                navigate('/login');
                return;
            }
            setError({ name: 'all', message: 'Error al guardar el producto' });
            setLoading(false);
            return;
        }
        setLoading(false);
        setError({ name: '', message: '' });
        setImages([]);
        onResetForm();
    };

    return (
        <form onSubmit={handleSubmit} >
            <Grid container spacing={2}  >
                <Grid item container xs={12} md={4} sx={{ mt: 1 }}>

                    <Typography variant="h6" sx={{ mb: 1 }}>Detalles</Typography>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Nombre"
                            type="text"
                            placeholder="Juan Perez"
                            fullWidth
                            name='nombre'
                            value={formState.nombre}
                            onChange={handleChange}
                            error={error?.name == 'nombre' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'nombre' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Telefono"
                            type="number"
                            placeholder="0971 123 456"
                            fullWidth
                            name='telefono'
                            value={formState.telefono}
                            onChange={handleChange}
                            error={error?.name == 'telefono' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'telefono' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                </Grid>
                <Grid item container xs={12} md={4} sx={{ mt: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Tamaño y medidas</Typography>


                    <Grid item container xs={12}>
                        {formState.medidas.map((medida, index) => (
                            <Grid key={index} container spacing={2} sx={{ mt: 1 }} >
                                <Grid item xs={5}>
                                    <TextField
                                        label="Nombre de la medida"
                                        type="text"
                                        fullWidth
                                        name="nombreMedida"
                                        value={medida.nombreMedida}
                                        onChange={(e) => handleMeasureChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Valor de la medida"
                                        type="text"
                                        fullWidth
                                        name="valorMedida"
                                        value={medida.valorMedida}
                                        onChange={(e) => handleMeasureChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => handleRemoveMeasure(index)} color="error">
                                        <HighlightOff />
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}

                        <Button onClick={handleAddMeasure} variant="contained" sx={{ mt: 1, height: 40 }}>Añadir medida</Button>
                    </Grid>

                </Grid>
                {!id && <Grid item container xs={12} md={4} sx={{ mt: 1 }} >
                    <Typography variant="h6" sx={{ mb: 1 }}>Imágenes</Typography>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Subir Imágenes
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Grid>
                    {error?.name == 'images' ? <Typography variant="caption" sx={{ mt: 2, color: 'error.main' }}>{error.message}</Typography> : ''}

                    <Grid item xs={12} sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 2, border: '1px solid', borderColor: error?.name == 'images' ? 'red' : "white", justifyContent: 'center', alignItems: 'center', borderRadius: 1 }}>
                        {images.map((image, index) => (
                            <Box key={index} sx={{ position: 'relative', }}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Imagen subida ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <Button
                                    sx={{ position: 'absolute', top: -10, right: -10, color: 'error.main', borderRadius: '50%', width: 30, height: 30, minWidth: 30, minHeight: 30, ":hover": { backgroundColor: 'red', opacity: 0.9 } }}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <HighlightOff fontSize="small" sx={{ ":hover": { color: "white" }, width: 25, height: 25 }} />
                                </Button>
                            </Box>
                        ))}
                    </Grid>
                </Grid>}
                <Grid container spacing={2} sx={{ mb: 2, mt: 1, ml: 2 }}>
                    <Grid item >
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={loading}
                            sx={{ backgroundColor: 'primary.button', color: 'white' }}
                        >
                            {loading ? <CircularProgress
                                size={40}
                                thickness={4}
                                sx={{
                                    color: 'error.main',
                                }} /> : 'Guardar Cliente'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
