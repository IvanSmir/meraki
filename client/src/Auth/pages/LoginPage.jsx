import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Button, CircularProgress, Grid, Link, TextField, } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useContext, useState } from "react"
import { AuthContext } from "../context"
import { HttpActions } from "../utils/HttpActions"

import * as Yup from 'yup'

const schema = Yup.object().shape({
    userName: Yup.string().required('El campo usuario es requerido').min(5, 'El nombre de usuario debe tener al menos 5 caracteres'),
    password: Yup.string().required('El campo contraseña es requerido').min(8, 'La contraseña debe tener al menos 8 caracteres'),
});


export const LoginPage = () => {
    const { login } = useContext(AuthContext)
    const [error, setError] = useState({ name: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { loginAuth } = HttpActions()
    const navigate = useNavigate()
    const { formState, onInputChange, onResetForm } = useForm({
        userName: '',
        password: ''
    })



    const handleChange = (e) => {
        setError({ name: '', message: '' })
        onInputChange(e)
    }




    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            schema.validateSync(formState)

        } catch (error) {
            setError({ name: error.path, message: error.message })
            return
        }
        try {
            setLoading(true)
            const userData = await loginAuth(formState)
            const lastPath = localStorage.getItem('lastPath') || '/';
            login(userData.user)
            navigate(lastPath, { replace: true });
        }
        catch (error) {
            setError({ name: 'all', message: error.message })
        }
        finally {
            setLoading(false)
            onResetForm()
        }
    }




    return (
        <AuthLayout title='Iniciar Sesion'>
            <form onSubmit={handleLogin}>
                <Grid container >
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Usuario"
                            type="text"
                            placeholder="JuanPerez"
                            fullWidth
                            name='userName'
                            value={formState.userName}
                            onChange={handleChange}
                            error={error?.name == 'userName' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'userName' || error.name == 'all' ? error.message : ''}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            placeholder="********"
                            fullWidth
                            name='password'
                            value={formState.password}
                            onChange={handleChange}
                            error={error?.name == 'password' || error.name == 'all' ? true : false}
                            helperText={error?.name == 'password' || error.name == 'all' ? error.message : ''}

                        />

                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item sm={12}>
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
                                    }} /> : 'Iniciar Sesión'}
                            </Button>
                        </Grid>
                        <Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
                            <Link component={RouterLink} color='inherit' to='/auth/register'>
                                Crear cuenta
                            </Link>
                        </Grid>

                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
