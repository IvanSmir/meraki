import { Route, Routes } from 'react-router-dom'
import { FormProductPage, ProductPage, ProductsPage } from '../../pages'
import { PrivateRoute } from '../PrivateRoutes'

export const ProductsRoutes = () => {

    return (
        <Routes>

            <Route path="/" element={<ProductsPage />} />
            <Route path="/:id" element={<ProductPage />} />

            <Route path="/new" element={
                <PrivateRoute>
                    <FormProductPage />
                </PrivateRoute>
            } />
            <Route path="/edit/:id" element={
                <PrivateRoute>
                    <FormProductPage />
                </PrivateRoute>
            } />
        </Routes>
    )
}
