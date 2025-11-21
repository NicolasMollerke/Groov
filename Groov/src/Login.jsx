import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: "",
            email: "",
            senha: ""
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
            const res = await fetch("http://localhost:3000/usuarios");
            if (!res.ok) throw new Error("Erro ao acessar a API");

            const usuarios = await res.json();

            const usuarioEncontrado = usuarios.find(
                (u) => u.nome === data.nome && u.email === data.email
            );

            if (!usuarioEncontrado) {
                throw new Error("Nome ou email não encontrados.");
            }

            if (!data.senha) {
                throw new Error("Senha inválida.");
            }

            const userData = { nome: usuarioEncontrado.nome, email: usuarioEncontrado.email };
            localStorage.setItem("user", JSON.stringify(userData));

            setSuccessMessage("Login realizado com sucesso!");
            navigate("/home");
        } catch (err) {
            console.error(err);
            setServerError(err.message || "Erro ao fazer login.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <main className="fixed inset-0 flex justify-center items-center flex-col w-full max-w-sm mx-auto gap-4">
                <div className="container mx-auto p-6 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6 text-roxop">Login</h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 max-w-md text-black [&_input::placeholder]:text-gray-400 [&_label]:text-gray-400"
                    >
                        {serverError && (
                            <div className="text-red-400 mb-2">{serverError}</div>
                        )}

                        {successMessage && (
                            <div className="text-green-400 mb-2">{successMessage}</div>
                        )}

                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome *</label>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                {...register("nome", { required: "Nome é obrigatório" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.nome && (
                                <span className="text-red-500 text-sm">{errors.nome.message}</span>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Email *</label>
                            <input
                                type="email"
                                placeholder="seu@exemplo.com"
                                {...register("email", {
                                    required: "Email é obrigatório",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email inválido",
                                    },
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email.message}</span>
                            )}
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Senha *</label>
                            <input
                                type="password"
                                placeholder="Sua senha"
                                {...register("senha", { required: "Senha é obrigatória" })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.senha && (
                                <span className="text-red-500 text-sm">{errors.senha.message}</span>
                            )}
                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full bg-roxop text-white py-2 rounded-md font-medium transition 
                                ${submitting
                                    ? "opacity-60 cursor-not-allowed"
                                    : "hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-700/30"
                                }`}
                        >
                            {submitting ? "Verificando..." : "Entrar"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;