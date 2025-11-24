import React from 'react';
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router"


export default function Cardusuario({ usuario }) {
    if (!usuario) return null;

    return (
        <>
            <Link to={`/usuario/${usuario.id}`} className='flex flex-col items-center col-span-1 border border-roxos rounded-2xl h-48 w-40 justify-center'>
                {usuario.foto? (<img src={usuario.foto} alt="" className='h-32 w-32 rounded-full object-cover'/>) : (<CgProfile className="text-9xl text-roxop" />)}
                <h2 className='text-center text-white font-bold text-[1rem]'>{usuario.nome}</h2>
            </Link>
        </>
    );
}