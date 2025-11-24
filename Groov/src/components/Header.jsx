import { Link, useLocation } from "react-router-dom"
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri"
import { FaStar, FaRegStar } from "react-icons/fa"
import { DiAptana } from "react-icons/di";
import Pesquisa from "../Pesquisa"


export default function Header() {
        const { pathname } = useLocation();


    const configuracao = pathname === "/favoritos";
    const favoritos = pathname === "/favoritos";
    const pesquisa = pathname === "/pesquisa";
    return (
        <>
                <header className="justify-center items-center flex md:py-4">
                    <div className="md:justify-between flex items-center  justify-center w-[80%]">
                        <Link to="/home">
                            <h1 className='text-center text-stroke-roxo text-transparent text-[2rem] md:text-8xl uppercase font-black py-3'>Groov</h1>
                        </Link>
                        <div className="hidden md:flex">
                                    <ul className="flex justify-center px-4 gap-9 ">
                                    <li>
                                        <Link to="/Perfil">
                                            <h1 className="text-3xl  text-roxop text-center justify-center items-center font-bold">Perfil</h1>
                                        </Link>
                                    </li>
                                    <li>
                                    <Link to="/home">
                                        <h1 className="text-3xl  text-roxop text-center justify-center items-center font-bold">Home</h1>
                                    </Link>
                                    </li>
                                    <li>
                                        <Link to="/Favoritos">
                                            {favoritos ? <FaStar className="w-10.25 h-auto text-roxop"/> : <FaRegStar className="w-10.25 h-auto text-roxop"/>}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Pesquisa">
                                            {pesquisa ? <RiSearch2Fill className="w-10.25 h-auto text-roxop"/> : <RiSearch2Line className="w-10.25 h-auto text-roxop "/>}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Configuracao">
                                            {configuracao ? <DiAptana className="w-10.25 h-auto text-roxop"/> : <DiAptana className="w-10.25 h-auto text-roxop "/>}
                                        </Link>
                                    </li>
                                                    </ul>
                                </div>
                    </div>
                    </header>
        </>
    )
}
