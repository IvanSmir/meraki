import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./Auth/context"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const MerakiApp = () => {
  return (

    <AppTheme>
      <BrowserRouter>

        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </AppTheme>
  )
}
