import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import CardEvento from "./components/Cardevento";
import CardOrganizador from "./components/CardOrganizador"; 

const MODOS_PESQUISA = {
  EVENTO: 'evento',
ORGANIZADOR: 'organizador',
};

const API_ENDPOINTS = {
    [MODOS_PESQUISA.EVENTO]: "http://localhost:3000/eventos",
    [MODOS_PESQUISA.ORGANIZADOR]: "http://localhost:3000/usuarios", 
};

export default function Pesquisa() {
  const [modoFiltro, setModoFiltro] = useState(MODOS_PESQUISA.EVENTO);
  
  const [dadosCarregados, setDadosCarregados] = useState([]); 
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultadosFiltrados, setResultadosFiltrados] = useState([]); 
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
            setResultadosFiltrados([]); 

            const endpoint = API_ENDPOINTS[modoFiltro];

      try {
        const resposta = await fetch(endpoint);
        if (!resposta.ok) throw new Error("Erro ao consultar a API.");
        const dados = await resposta.json();

                let listaDados;
                if (modoFiltro === MODOS_PESQUISA.EVENTO) {
                    listaDados = Array.isArray(dados) ? dados : dados.eventos || []; 
                } else { 
                    listaDados = Array.isArray(dados) ? dados : dados.usuarios || []; 
                }

        setDadosCarregados(listaDados);
      } catch (erro) {
        console.error(`Erro ao carregar ${modoFiltro}: `, erro.message);
                setDadosCarregados([]); 
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, [modoFiltro]); 

  useEffect(() => {
    const termo = termoPesquisa.toUpperCase().trim();

    if (!termo) {
      setResultadosFiltrados([]);
      return;
    }

    const resultados = dadosCarregados.filter(item => {
            const nomeItem = item.nome ? item.nome.toUpperCase() : '';
            return nomeItem.includes(termo);
    });

    setResultadosFiltrados(resultados);
  }, [termoPesquisa, dadosCarregados]); 

  const listaResultados = resultadosFiltrados.map(item => {
        if (modoFiltro === MODOS_PESQUISA.EVENTO) {
            return <CardEvento key={item.id} evento={item} />;
        } else {
            return <CardOrganizador key={item.id} usuario={item} />;
        }
    });
  
  const placeholderText = modoFiltro === MODOS_PESQUISA.EVENTO 
    ? "Pesquise pelo nome do evento" 
    : "Pesquise pelo nome do organizador";
    
  const modoAtualTexto = modoFiltro === MODOS_PESQUISA.EVENTO ? 'Eventos' : 'Organizadores';


  return (
    <>
      <Header/>
      <main className='flex flex-col items-center mx-auto justify-center'>
        <div className='flex justify-center mx-auto w-full' style={{marginBottom: '20px'}}>
          <input 
            type="text" 
            className='w-[20rem] h-8 text-white bg-gray-800 text-[15px] text-center rounded-[1.25rem] border-solid border-2 border-roxop' 
            placeholder={placeholderText} 
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-4 gap-4">
          <button 
            onClick={() => setModoFiltro(MODOS_PESQUISA.EVENTO)}
            className={`px-4 py-2 rounded-lg font-bold ${modoFiltro === MODOS_PESQUISA.EVENTO ? 'bg-roxop text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Eventos
          </button>
          <button 
            onClick={() => setModoFiltro(MODOS_PESQUISA.ORGANIZADOR)}
            className={`px-4 py-2 rounded-lg font-bold ${modoFiltro === MODOS_PESQUISA.ORGANIZADOR ? 'bg-roxop text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Organizador
          </button>
        </div>
        
        {carregando && <p className="text-center text-white">Carregando dados...</p>}

        {!carregando && termoPesquisa.trim() !== '' && resultadosFiltrados.length === 0 && (
          <p className="text-center justify-center text-white">
            Não encontramos resultados em **"{modoAtualTexto}"** para a busca: **"{termoPesquisa}"**
          </p>
        )}
        <section className='grid-cols-2 w-full grid gap-3'> 
          {listaResultados}
        </section>
        <NavBar/>
      </main> 
    </>
  );
}