import { Link, useLocation } from "react-router"
import { GoHomeFill, GoHome } from "react-icons/go";
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri";
import { FaStar, FaRegStar  } from "react-icons/fa";
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";






export default function NavBar() {
    const { pathname } = useLocation();

    const home = pathname === "/home";
    const pesquisa = pathname === "/pesquisa";
    const favoritos = pathname === "/favoritos";
    const perfil = pathname === "/perfil";
    
    return (
        <>
            <nav className="py-2 border-t-2 border-roxop fixed bottom-0 w-full">
                <ul className="flex justify-between px-4">
                    <li>
                        <Link to="/home">
                            {home ? <GoHomeFill className="w-10.25 h-auto text-roxop"/> : <GoHome className="w-10.25 h-auto text-roxop "/>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/pesquisa">
                            {pesquisa ? <RiSearch2Fill className="w-10.25 h-auto text-roxop"/> : <RiSearch2Line className="w-10.25 h-auto text-roxop"/>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/favoritos">
                            {favoritos ? <FaStar className="w-10.25 h-auto text-roxop"/> : <FaRegStar className="w-10.25 h-auto text-roxop"/>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/perfil">
                            {perfil ? <MdAccountCircle className="w-10.25 h-auto text-roxop"/> : <MdOutlineAccountCircle className="w-10.25 h-auto text-roxop"/>}
                        </Link>
                    </li>
                    
                </ul>
            </nav>
        </>
    )
}