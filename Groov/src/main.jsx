import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'

import App from './App.jsx'
import Pesquisa from './Pesquisa.jsx'
import Favoritos from './Favoritos.jsx'
import Perfil from './Perfil.jsx'

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "pesquisa", Component: Pesquisa },
  { path: "favoritos", Component: Favoritos },
  { path: "perfil", Component: Perfil },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
