import { Route, Routes } from "react-router-dom"
import { AuthRoute } from "../Auth/routes/AuthRoute"
import { MerakiRoutes } from "../Meraki/routes/MerakiRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoute />} />
            <Route path="*" element={<MerakiRoutes />} />
        </Routes>
    )
}
