import { Route, Routes } from 'react-router-dom'
import { ClientPage, ClientsPage, FormClientPage } from '../../pages'

export const ClientsRoutes = () => {
    return (
        <Routes>

            <Route path="/" element={<ClientsPage />} />
            <Route path="/new" element={<FormClientPage />} />
            <Route path="/edit/:id" element={<FormClientPage />} />
            <Route path="/:id" element={<ClientPage />} />
        </Routes>
    )
}
