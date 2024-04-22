import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from '../../ui/components'
import { Toolbar } from '@mui/material'
import { MainPage, ProductClientPage } from '../pages'
import { ClientsRoutes } from './clients/ClientsRoutes'
import { ProductsRoutes } from './products/ProductsRoutes'
import { PrivateRoute } from './PrivateRoutes'
import AboutUs from '../components/AboutUs'
import { ContactUS } from '../components/ContactUs'

export const MerakiRoutes = () => {
    return (
        <>
            <NavBar />
            <Toolbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/clients/*" element={<PrivateRoute>
                    <ClientsRoutes />
                </PrivateRoute>} />
                <Route path="/products/*" element={<ProductsRoutes />} />
                <Route path="/products/client" element={<ProductClientPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUS />} />
                <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
        </>


    )
}
