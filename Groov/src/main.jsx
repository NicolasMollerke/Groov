import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'

import App from './App.jsx'
import Pesquisa from './Pesquisa.jsx'
import Favoritos from './Favoritos.jsx'
import Perfil from './Perfil.jsx'
import CriarConta from './CriarConta.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Bares from './Bares.jsx'
import Universitarias from './Universitarias.jsx'
import Festas from './Festas.jsx'
import Shows from './Shows.jsx'
import Evento from './Evento.jsx'
import InclusaoEvento from './InclusaoEvento.jsx'
import Usuario from './Usuario.jsx'

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "criarConta", Component: CriarConta },
  { path: "login", Component: Login },
  { path: "home", Component: Home },
  { path: "pesquisa", Component: Pesquisa },
  { path: "favoritos", Component: Favoritos },
  { path: "perfil", Component: Perfil },
  { path: "shows", Component: Shows },
  { path: "festas", Component: Festas },
  { path: "universitarias", Component: Universitarias },
  { path: "bares", Component: Bares },
  { path: "evento/:eventoId", Component: Evento },
  { path: "inclusaoEvento", Component: InclusaoEvento },
  { path: "usuario/:usuarioId", Component: Usuario }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
