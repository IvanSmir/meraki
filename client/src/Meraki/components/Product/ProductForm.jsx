import { Box, Button, CircularProgress, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material"
import { useForm } from "../../../hooks"
import { useEffect, useState } from "react"
import { HighlightOff } from "@mui/icons-material"
import * as Yup from 'yup'
import { HttpActionsProducts } from "../../utils/HttpActionsProducts"
import { useNavigate, useParams } from "react-router-dom"

const schema = Yup.object().shape({
    titulo: Yup.string().required('El campo titulo es requerido').min(5, 'El titulo debe tener al menos 5 caracteres'),
    description: Yup.string().required('El campo descripción es requerido').min(10, 'La descripción debe tener al menos 10 caracteres'),
    materiales: Yup.string().required('El campo materiales es requerido').min(5, 'Los materiales deben tener al menos 5 caracteres'),
    precio: Yup.number().required('El campo precio es requerido').min(1, 'El precio debe ser mayor a 0'),
    ajuste: Yup.string().required('El campo ajuste es requerido'),
    cuidados: Yup.string().required('El campo cuidados es requerido'),
    tallas: Yup.object().shape({
        xs: Yup.boolean(),
        s: Yup.boolean(),
        m: Yup.boolean(),
        l: Yup.boolean(),
        xl: Yup.boolean(),
        otros: Yup.boolean()
    })
});

const initialValues = {
    titulo: '',
    description: '',
    materiales: '',
    precio: '',
    medidas: '',
    ajuste: '',
    cuidados: '',
    tallas: {
        xs: false,
        s: false,
        m: false,
        l: false,
        xl: false,
        otros: false
    }
}


const { createProduct, updateProduct, getProduct } = HttpActionsProducts()

export const ProductForm = () => {
    const id = useParams().id
    const navigate = useNavigate()
    const [error, setError] = useState({ name: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { formState, onInputChange, onResetForm } = useForm({ ...initialValues })
    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const data = await getProduct(id)
                    onInputChange({ target: { name: 'titulo', value: data.nombre } })
                    onInputChange({ target: { name: 'description', value: data.description } })
                    onInputChange({ target: { name: 'materiales', value: data.materiales } })
                    onInputChange({ target: { name: 'precio', value: data.precio } })
                    onInputChange({ target: { name: 'medidas', value: data.medidas } })
                    onInputChange({ target: { name: 'ajuste', value: data.ajuste } })
                    onInputChange({ target: { name: 'cuidados', value: data.cuidados } })
                    onInputChange({
                        target: {
                            name: 'tallas', value: {
                                xs: !!data.tallas.xs,
                                s: !!data.tallas.s,
                                m: !!data.tallas.m,
                                l: !!data.tallas.l,
                                xl: !!data.tallas.xl,
                                otros: !!data.tallas.otros
                            }
                        }
                    })


                } catch (error) {
                    setError({ name: 'all', message: 'Error al cargar el producto' })
                }
            }
            fetchProduct()
        }
    }, [id, onInputChange])

    const [images, setImages] = useState([])
    const handleImageChange = (e) => {
        if (images.length >= 5) return setError({ name: 'images', message: 'Solo se permiten 5 imágenes' }
        )
        setImages([...images, ...e.target.files])
    }

    const handleRemoveImage = (indexToRemove) => {
        setError({ name: '', message: '' })
        setImages(images.filter((_, index) => index !== indexToRemove));
    };


    const handleChange = (e) => {
        setError({ name: '', message: '' })
        if (e.target.name === 'xs' || e.target.name === 's' || e.target.name === 'm' || e.target.name === 'l' || e.target.name === 'xl' || e.target.name === 'otros') {
            onInputChange({ target: { name: 'tallas', value: { ...formState.tallas, [e.target.name]: e.target.checked } } })
        } else {
            onInputChange(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            schema.validateSync({ ...formState, images })
        } catch (error) {
            setError({ name: error.path, message: error.message })
            setLoading(false)
            return
        }

        if (!id) {
            if (images.length === 0) {
                setLoading(false)
                return setError({ name: 'images', message: 'Por favor suba al menos una imagen' })
            }
            try {
                await createProduct({ ...formState, images })

            } catch (error) {
                setError({ name: 'all', message: 'Error al guardar el producto' });
                setLoading(false);
                return
            }
        }
        else {
            try {
                await updateProduct({ ...formState }, id)
                navigate(`/products/${id}`)

            } catch (error) {
                setError({ name: 'all', message: 'Error al actualizar el producto' });
                setLoading(false);
                return
            }

        }
        setLoading(false)
        setError({ name: '', message: '' });
        setImages([])
        onResetForm()

    }

    return (
        <form onSubmit={handleSubmit} >
            <Grid container spacing={2}  >
                <Grid item container xs={12} md={4} sx={{ mt: 1 }}>

                    <Typography variant="h6" sx={{ mb: 1 }}>Detalles</Typography>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Titulo"
                            type="text"
                            placeholder="Remera"
                            fullWidth
                            name='titulo'
                            value={formState.titulo}
                            onChange={handleChange}
                            error={error?.name == 'titulo' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'titulo' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Descripción"
                            type="text"
                            placeholder="remera de algodon con estampado"
                            fullWidth
                            name='description'
                            value={formState.description}
                            onChange={handleChange}
                            error={error?.name == 'description' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'description' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Materiales"
                            type="text"
                            placeholder="algodon, poliester, elastan"
                            fullWidth
                            name='materiales'
                            value={formState.materiales}
                            onChange={handleChange}
                            error={error?.name == 'materiales' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'materiales' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Precio"
                            type="text"
                            placeholder="100000 PYG"
                            fullWidth
                            name='precio'
                            value={formState.precio}
                            onChange={handleChange}
                            error={error?.name == 'precio' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'precio' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>

                </Grid>
                <Grid item container xs={12} md={4} sx={{ mt: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Tamaño y medidas</Typography>


                    <Grid item container xs={12} sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.xs} onChange={handleChange} name="xs" />
                            }
                            label="XS"
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.s} onChange={handleChange} name="s" />
                            }
                            label="S"
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.m} onChange={handleChange} name="m" />
                            }
                            label="M"
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.l} onChange={handleChange} name="l" />
                            }
                            label="L"
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.xl} onChange={handleChange} name="xl" />
                            }
                            label="XL"
                        />
                        <FormControlLabel
                            control={
                                <Switch checked={formState.tallas.otros} onChange={handleChange} name="otros" />
                            }
                            label="Otros"
                        />

                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Medidas"
                            type="text"
                            placeholder="50 cm de largo x 30 cm de ancho"
                            fullWidth
                            name='medidas'
                            value={formState.medidas}
                            onChange={handleChange}
                            error={error?.name == 'medidas' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'medidas' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Ajuste"
                            type="text"
                            placeholder="Corte regular"
                            fullWidth
                            name='ajuste'
                            value={formState.ajuste}
                            onChange={handleChange}
                            error={error?.name == 'ajuste' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'ajuste' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                        <TextField
                            label="Cuidados"
                            type="text"
                            placeholder="Lavar a mano con agua fria"
                            fullWidth
                            name='cuidados'
                            value={formState.cuidados}
                            onChange={handleChange}
                            error={error?.name == 'cuidados' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'cuidados' || error.name == 'all' ? error.message : ''}
                        />

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
                                <Button
                                    sx={{ position: 'absolute', top: -10, right: -10, color: 'error.main', borderRadius: '50%', width: 30, height: 30, minWidth: 30, minHeight: 30, ":hover": { backgroundColor: 'red', opacity: 0.9 } }}
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    <HighlightOff fontSize="small" sx={{ ":hover": { color: "white" }, width: 25, height: 25 }} />
                                </Button>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Imagen subida ${index + 1}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />

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
                                }} /> : id ? 'Editar Producto' : 'Guardar Producto'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}
