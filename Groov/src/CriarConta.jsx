import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"
import Header from "./components/Header"

function CriarConta() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            nome: "",
            email: ""
        }
    });

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`HTTP ${res.status}: ${txt}`);
            }

            const created = await res.json();
            console.log("Usuário criado:", created);
            setSuccessMessage("Conta criada com sucesso!");
            navigate("/home");
            reset();
        } catch (err) {
            console.error(err);
            setServerError("Não foi possível criar a conta. Tente novamente mais tarde.");
        } finally {
            setSubmitting(false);
        }
    };

    const limparForm = () => reset();

    return (
        <>
            <Header />
            <main className='flex flex-col items-center mx-auto justify-center'>
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6 text-roxop">Criar Conta</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md text-black [&_input::placeholder]:text-gray-400 [&_label]:text-gray-400">
                        {serverError && <div className="text-red-400 mb-2">{serverError}</div>}
                        {successMessage && <div className="text-green-400 mb-2">{successMessage}</div>}
                        <div>
                            <label className="block text-sm font-medium mb-1 ">Nome *</label>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                {...register("nome", { required: "Nome é obrigatório" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 ">Email *</label>
                            <input
                                type="email"
                                placeholder="seu@exemplo.com"
                                {...register("email", {
                                    required: "Email é obrigatório",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 ">Senha *</label>
                            <input
                                type="password"
                                placeholder="Sua senha"
                                {...register("senha", {
                                    required: "Senha é obrigatória",
                                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "Senha inválida" }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Foto</label>
                            <input
                                type="text"
                                placeholder="URL da sua foto"
                                {...register("foto")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.foto && <span className="text-red-500 text-sm">{errors.foto.message}</span>}
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`flex-1 bg-roxop text-white py-2 rounded-md font-medium transition ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-700/30'}`}
                            >
                                {submitting ? 'Enviando...' : 'Criar Conta'}
                            </button>
                            <button
                                type="button"
                                onClick={limparForm}
                                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-400 transition "
                            >
                                Limpar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default CriarConta;