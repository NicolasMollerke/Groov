// CardOrganizador.js
import React from 'react';

// Este componente recebe o objeto completo do organizador (id, nome, email)
export default function CardOrganizador({ organizador }) {
    if (!organizador) return null;

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 m-2 flex flex-col items-center max-w-sm">
            
            <h3 className="text-xl font-bold text-roxop mb-2 text-center">
                {organizador.nome}
            </h3>
            
            <p className="text-gray-300 text-md mb-2">
                {organizador.email}
            </p>
            
            <p className="text-gray-500 text-sm mb-4">
                ID: {organizador.id}
            </p>
            
            <button 
                className="bg-roxop hover:bg-roxo-claro text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => alert(`Você clicou em: ${organizador.nome}`)}
            >
                Ver Detalhes do Organizador
            </button>
        </div>
    );
}