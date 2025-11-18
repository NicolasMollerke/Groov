import { Link, useLocation } from "react-router"
import { GoHomeFill, GoHome } from "react-icons/go"
import { RiSearch2Fill, RiSearch2Line } from "react-icons/ri"
import { FaStar, FaRegStar } from "react-icons/fa"
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md"
import { DiAptana } from "react-icons/di";
import Pesquisa from "../Pesquisa"



export default function Header_pc() {
    const { pathname } = useLocation();


    const configuracao = pathname === "/favoritos";
    const favoritos = pathname === "/favoritos";
    const pesquisa = pathname === "/pesquisa";
    return (
        <><div className="hidden md:block">
            < Pesquisa />
                <header className="h-[3.7rem] w-[80rem]  flex  justify-around  mt-6 items-center  flex-row mb-12  ">
                    <img src="/img/GROOV.png" alt="" />
                        <div className="flex">
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
                </header>
        </div>
        </>
    )
}