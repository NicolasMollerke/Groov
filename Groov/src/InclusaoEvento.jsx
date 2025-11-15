import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Header from "./components/Header";


function InclusaoEvento() {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            tipo: "shows",
            nome: "",
            categoria: "shows",
            imagem: "",
            descricao: "",
            data: "",
            hora: "",
            local: "",
            atracoes: "",
            organizadores: [],
            palavrasChave: [],
            ingresso: {
                tipo: "",
                lote: "",
                preco: ""
            }
        }
    });

    const KEYWORDS = [
        "Eletrônica", "Funk", "Hip Hop", "Trap", "Pop", "Sertanejo", "Pagode", "Samba", "Rock", "Indie", "Reggaeton", "MPB",
        "Barzinho", "Pub", "Balada", "Lounge", "Boteco", "Rooftop", "Karaokê", "Clube Noturno", "Beach Club", "House Party",
        "Clima Romântico", "Good Vibes", "Alta Energia", "Relax", "Chill", "Open Bar", "Open Food", "After", "Pré-night",
        "Universitário", "LGBTQ+ Friendly", "Mais Adulto (25+)", "Turístico", "Alternativo", "Casual", "Luxuoso",
        "DJ ao vivo", "Banda ao vivo", "Música ao vivo", "Mesa de Sinuca", "Beer Pong", "Stand-up", "Jogos", "Áreas externas", "Pet Friendly",
        "Drinks Artesanais", "Cerveja Artesanal", "Cerveja Barata", "Wine Bar", "Chopp Gelado", "Destilados",
        "Comida de Bar", "Petiscos", "Food Trucks",
        "Centro", "Praia", "Eventos Especiais", "Rolês Temáticos", "Festivais", "Shows"
    ];

    const [showKeywords, setShowKeywords] = useState(false);
    const keywordsRef = useRef(null);

    const [buscaOrg, setBuscaOrg] = useState("");
    const [sugestoesOrg, setSugestoesOrg] = useState([]);
    const [organizadoresSelecionados, setOrganizadoresSelecionados] = useState([]);

    useEffect(() => {
        if (showKeywords) {
            const firstBtn = keywordsRef.current?.querySelector("button");
            firstBtn?.focus();
        }
    }, [showKeywords]);

    useEffect(() => {
        if (buscaOrg.length === 0) {
            setSugestoesOrg([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                const res = await fetch("http://localhost:3000/usuarios");
                const data = await res.json();

                const termo = buscaOrg.toLowerCase();

                const filtrados = data.filter((u) =>
                    u.nome.toLowerCase().includes(termo)
                );

                setSugestoesOrg(filtrados);
            } catch (err) {
                console.error("Erro ao buscar organizadores:", err);
            }
        }, 200);

        return () => clearTimeout(delay);
    }, [buscaOrg]);

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            atracoes: data.atracoes.split(",").map(a => a.trim()),
            organizadores: data.organizadores,
            palavrasChave: data.palavrasChave,

            ingresso: data.ingresso
        };


        try {
            const response = await fetch("http://localhost:3000/eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const result = await response.json();
            console.log("Resposta da API:", result);

            alert("Evento criado com sucesso!");
            reset();

        } catch (error) {
            console.error("Erro ao enviar evento:", error);
            alert("Falha ao criar o evento.");
        }
    };

    const limparForm = () => {
        reset();
    };


    return (
        <>
            <Header />
            <div className="min-h-screen text-white p-6">
                <h1 className="text-3xl font-bold mb-8 text-purple-400">Criar Novo Evento</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Nome do Evento *</label>
                        <input
                            type="text"
                            placeholder="Nome do evento"
                            {...register("nome", { required: "Nome é obrigatório" })}
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white 
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                    </div>

                    {/* Categoria */}
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1 text-gray-200">Categoria *</label>
                        <select
                            {...register("categoria", { required: "Categoria é obrigatória" })}
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                        >
                            <option value="shows">Shows</option>
                            <option value="festas">Festas</option>
                            <option value="bares">Bares</option>
                            <option value="universitarias">Universitárias</option>
                        </select>
                        {/* Triângulo da seta */}
                        <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
                            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria.message}</span>}
                    </div>

                    {/* Imagem */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Imagem do Evento *</label>
                        <input
                            type="url"
                            placeholder="https://link-da-imagem.com"
                            {...register("imagem", { required: "Imagem é obrigatória" })}
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white 
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.imagem && <span className="text-red-500 text-sm">{errors.imagem.message}</span>}
                    </div>


                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Descrição *</label>
                        <textarea
                            {...register("descricao", { required: "Descrição é obrigatória" })}
                            rows="4"
                            placeholder="Descreva o evento..."
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                    </div>

                    {/* Data + Hora */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 text-gray-200">Data *</label>
                            <input
                                type="date"
                                {...register("data", { required: "Data é obrigatória" })}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.data && <span className="text-red-500 text-sm">{errors.data.message}</span>}
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 text-gray-200">Hora *</label>
                            <input
                                type="time"
                                {...register("hora", { required: "Hora é obrigatória" })}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.hora && <span className="text-red-500 text-sm">{errors.hora.message}</span>}
                        </div>
                    </div>

                    {/* Local */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Local *</label>
                        <input
                            type="text"
                            placeholder="Endereço do evento"
                            {...register("local", { required: "Local é obrigatório" })}
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.local && <span className="text-red-500 text-sm">{errors.local.message}</span>}
                    </div>

                    {/* Atrações */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Atrações *</label>
                        <textarea
                            {...register("atracoes", { required: "Atrações é obrigatório" })}
                            rows="3"
                            placeholder="Liste as atrações..."
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.atracoes && <span className="text-red-500 text-sm">{errors.atracoes.message}</span>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1 text-gray-200">Organizadores *</label>

                        <input
                            type="text"
                            placeholder="Digite o nome do organizador"
                            className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setBuscaOrg(e.target.value)}
                        />

                        {sugestoesOrg.length > 0 && (
                            <ul className="absolute z-10 bg-[#1A1A1A] w-full border border-purple-500/40 rounded-md mt-1 max-h-40 overflow-y-auto text-white">
                                {sugestoesOrg.map((u) => (
                                    <li
                                        key={u.id}
                                        className="px-3 py-2 cursor-pointer hover:bg-purple-500/20"
                                        onClick={() => {
                                            if (!organizadoresSelecionados.includes(u.nome)) {
                                                const atualizado = [...organizadoresSelecionados, u.nome];
                                                setOrganizadoresSelecionados(atualizado);
                                                setValue("organizadores", atualizado);
                                            }

                                            setBuscaOrg("");
                                            setSugestoesOrg([]);
                                        }}
                                    >
                                        {u.nome}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            {organizadoresSelecionados.map((org) => (
                                <span
                                    key={org}
                                    className="px-3 py-1 bg-purple-600 rounded-full cursor-pointer"
                                    onClick={() => {
                                        const atualizado = organizadoresSelecionados.filter(o => o !== org);
                                        setOrganizadoresSelecionados(atualizado);
                                        setValue("organizadores", atualizado);
                                    }}
                                >
                                    {org} ✕
                                </span>
                            ))}
                        </div>

                        <input
                            type="hidden"
                            {...register("organizadores", { required: "Organizadores é obrigatório" })}
                        />

                        {errors.organizadores && (
                            <span className="text-red-500 text-sm">{errors.organizadores.message}</span>
                        )}
                    </div>

                    {/* Campo Palavras-chave */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Palavras-chave *</label>

                        <button
                            type="button"
                            aria-expanded={showKeywords}
                            aria-controls="keywords-panel"
                            onClick={() => setShowKeywords(v => !v)}
                            className="mt-2 w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white text-left"
                        >
                            {showKeywords ? "Ocultar palavras-chave" : "Selecionar palavras-chave"}
                        </button>

                        {showKeywords && (
                            <div id="keywords-panel" ref={keywordsRef} className="mt-3">
                                <Controller
                                    name="palavrasChave"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ required: "Selecione pelo menos uma palavra-chave" }}
                                    render={({ field }) => {
                                        const { value, onChange } = field;

                                        const toggle = (keyword) => {
                                            const exists = value.includes(keyword);
                                            const updated = exists
                                                ? value.filter(k => k !== keyword)
                                                : [...value, keyword];
                                            onChange(updated);
                                        };

                                        return (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {KEYWORDS.map((kw) => {
                                                    const selected = value.includes(kw);
                                                    return (
                                                        <button
                                                            key={kw}
                                                            type="button"
                                                            onClick={() => toggle(kw)}
                                                            className={`px-3 py-2 rounded-full text-sm border transition 
                                            ${selected ? "bg-purple-500 text-white border-purple-500 font-semibold"
                                                                    : "border-purple-500 text-white/70 hover:bg-purple-500/20"}`}
                                                        >
                                                            {kw}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }}
                                />
                            </div>
                        )}

                        {errors.palavrasChave && (
                            <span className="text-red-500 text-sm">{errors.palavrasChave.message}</span>
                        )}
                    </div>

                    {/* Card Ingresso */}
                    <div className="mt-8 p-4 border border-purple-500/40 rounded-lg bg-[#161616]">
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">Informações do Ingresso</h2>

                        {/* Tipo */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-200">Tipo de Ingresso</label>
                            <input
                                type="text"
                                placeholder="Pista, VIP, Mesanino..."
                                {...register("ingresso.tipo")}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Lote */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-200">Lote</label>
                            <input
                                type="text"
                                placeholder="1º lote, 2º lote..."
                                {...register("ingresso.lote")}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>


                        {/* Preço */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-200">Preço (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Preço do ingresso"
                                {...register("ingresso.preco", {
                                    min: { value: 0, message: "O preço não pode ser negativo" },
                                    setValueAs: v => parseFloat(v)
                                })}
                                className="w-full px-3 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded-md text-white
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.ingressoPreco && <span className="text-red-500 text-sm">{errors.ingressoPreco.message}</span>}
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition"
                        >
                            Criar Evento
                        </button>

                        <button
                            type="button"
                            onClick={limparForm}
                            className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-md font-medium hover:bg-gray-600 transition"
                        >
                            Limpar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default InclusaoEvento;