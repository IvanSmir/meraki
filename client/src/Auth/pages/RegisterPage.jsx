import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useState } from "react"
import { HttpActions } from "../utils/HttpActions"
import * as Yup from 'yup'

const schema = Yup.object().shape({
    firstName: Yup.string().required('El campo nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: Yup.string().required('El campo apellido es requerido').min(2, 'El apellido debe tener al menos 2 caracteres'),
    userName: Yup.string().required('El campo usuario es requerido').min(5, 'El nombre de usuario debe tener al menos 5 caracteres'),
    password: Yup.string().required('El campo contraseña es requerido').min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
});

export const RegisterPage = () => {

    const [error, setError] = useState({ name: '', message: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { registerAuth } = HttpActions()
    const { formState, onInputChange, onResetForm } = useForm({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setError({ name: '', message: '' })
        onInputChange(e)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            schema.validateSync(formState)
        } catch (error) {
            setError({ name: error.path, message: error.message })
            return
        }
        try {
            setLoading(true)
            await registerAuth(formState)
            navigate('/auth/login')
        }
        catch (error) {
            setError({ name: 'all', message: error.message })
        }
        finally {
            setLoading(false)
            onResetForm()
        }
        onResetForm()
    }

    return (
        <AuthLayout title='Register'>
            <form onSubmit={handleRegister}>
                <Grid container>
                    <Grid container sx={{ mt: 2 }} spacing={{ xs: 0, md: 2 }} >
                        <Grid item xs={12} sx={{ mt: 2 }} md={6}>
                            <TextField
                                label="Nombre"
                                type="text"
                                placeholder="Juan"
                                fullWidth
                                name='firstName'
                                onChange={handleChange}
                                value={formState.firstName}
                                error={error?.name == 'firstName' || error.name == 'all' ? true : false}
                                helperText={error?.name == 'firstName' || error.name == 'all' ? error.message : ''}

                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }} md={6}>
                            <TextField
                                label="Apellido"
                                type="text"
                                placeholder="Perez"
                                fullWidth
                                name='lastName'
                                value={formState.lastName}
                                onChange={handleChange}
                                error={error?.name == 'lastName' || error.name == 'all' ? true : false}
                                helperText={error?.name == 'lastName' || error.name == 'all' ? error.message : ''}

                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre de usuario"
                            type="text"
                            placeholder="juanperez"
                            fullWidth
                            name='userName'
                            value={formState.userName}
                            onChange={handleChange}
                            error={error?.name == 'userName' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'userName' || error.name == 'all' ? error.message : ''}
                        />
                    </Grid>
                    <Grid container sx={{ mt: 2 }} spacing={{ xs: 0, md: 2 }} >
                        <Grid item xs={12} sx={{ mt: 2 }} md={6}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                placeholder="*******"
                                fullWidth
                                name='password'
                                value={formState.password}
                                onChange={handleChange}
                                error={error?.name == 'password' || error.name == 'all' ? true : false}
                                helperText={error?.name == 'password' || error.name == 'all' ? error.message : ''}

                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }} md={6}>
                            <TextField
                                label="Confirmar Contraseña"
                                type="password"
                                placeholder="*******"
                                fullWidth
                                name='confirmPassword'
                                value={formState.confirmPassword}
                                onChange={handleChange}
                                error={error?.name == 'confirmPassword' || error.name == 'all' ? true : false}
                                helperText={error?.name == 'confirmPassword' || error.name == 'all' ? error.message : ''}

                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                {loading ? <CircularProgress
                                    size={40}
                                    thickness={4}
                                    sx={{
                                        color: 'error.main',
                                    }} /> : 'Registrar'}

                            </Button>
                        </Grid>
                        <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
                            <Typography sx={{ mr: 1 }}>
                                ¿Ya tienes cuenta?
                            </Typography>
                            <Link component={RouterLink} color='inherit' to='/auth/login'>
                                Iniciar sesión
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </AuthLayout>
    )
}
