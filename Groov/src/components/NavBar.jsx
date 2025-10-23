import { Link, useLocation } from "react-router"


export default function NavBar() {
    const location = useLocation();
    const path = location.pathname;
    
    return (
        <>
            <nav className="h-13.75 border-t-2 border-roxop">
                <ul className="flex justify-between px-2">
                    <Link to="/"><img src={path === "/" ? "/NavBar/MenuP.png" : "/NavBar/Menu.png"} alt="" /></Link>
                    <Link to="/pesquisa"><img src={path === "/pesquisa" ? "/NavBar/PesquisaP.png" : "/NavBar/Pesquisa.png"} alt="" /></Link>
                    <Link to="/favoritos"><img src={path === "/favoritos" ? "/NavBar/FavoritosP.png" : "/NavBar/Favoritos.png"} alt="" /></Link>
                    <Link to="/perfil"><img src={path === "/perfil" ? "/NavBar/PerfilP.png" : "/NavBar/Perfil.png"} alt="" /></Link>
                </ul>
            </nav>
        </>
    )
}