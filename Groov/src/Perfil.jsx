import NavBar from "./components/NavBar"
import { CgProfile } from "react-icons/cg";
import Header from "./components/Header"
import { Link } from "react-router"
import { FaPlusCircle } from "react-icons/fa";


function Perfil() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    return(
        <>
            <Header/>
            <main className='flex flex-col items-center mx-auto justify-center'>
                <section className="flex w-full items-end justify-between relative">
                <Link to="/inclusaoEvento"><FaPlusCircle className="text-roxop text-3xl absolute top-2 right-0 z-10 w-14"/></Link>
                    {user.foto? (<img className="w-16 h-16 md:h-64 md:w-64" src={user.foto}/>) : (<CgProfile className="text-[6rem] md:text-[16rem] text-roxop" />)}
                    <div className="flex flex-col items-center mt-4">
                        <h2 className="text-white text-start text-[0.875rem] font-semibold">{user.nome}</h2>
                        <h3 className="text-white text-start text-[0.875rem] font-semibold">{user.email}</h3>
                    </div>
                </section>
                <section className="w-full mt-8">
                    <ul>
                        <hr className="w-full text-gray-500 border"/>
                        <li className="py-4 text-gray-500 font-semibold">Meus ingressos</li>
                        <hr className="w-full text-gray-500 border"/>
                        <li className="py-4 text-gray-500 font-semibold">Meus eventos</li>
                        <hr className="w-full text-gray-500 border"/>
                        <li className="py-4 text-gray-500 font-semibold">Minhas informações</li>
                        <hr className="w-full text-gray-500 border"/>
                        <li className="py-4 text-gray-500 font-semibold">Formas de pagamento</li>
                        <hr className="w-full text-gray-500 border"/>
                        <li className="py-4 text-gray-500 font-semibold">Política de privacidade</li>
                        <hr className="w-full text-gray-500 border"/>
                    </ul>
                </section>
            </main>
            <NavBar/>
        </>
    )

}

export default Perfil