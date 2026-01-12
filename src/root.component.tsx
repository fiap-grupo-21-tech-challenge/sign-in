import { FormEvent, useState } from "react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { auth } from '@grupo21/shared-react'
import { navigateToUrl } from "single-spa";

export default function Root(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authErrorMessage, loginUser } = auth;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Informe um e-mail válido");
    if (!password) return setError("Informe sua senha.");

    setSubmitting(true);
    try {
      await loginUser({ email: email.trim(), password });
      navigateToUrl('/dashboard')
    } catch (err: unknown) {
      setError(authErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen from-slate-50 to-white py-16">
      <header className="mx-auto y-16 flex max-w-md flex-col items-center gap-3 px-4 py-8">
        {/* <Logo /> */}
        <button
          onClick={() => navigateToUrl('/')}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <FiArrowLeft className="shrink-0" />
          Voltar ao início
        </button>
      </header>

      <main className="mx-auto w-full max-w-md px-4">
        <section
          className={`rounded-2xl bg-white p-6 shadow-lg shadow-gray-500/50 sm:p-8`}
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">Entrar na sua conta</h1>
            <p className="mt-1 text-slate-500">Acesse seu painel financeiro</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="block text-sm font-bold">E-mail</label>
              <input
                placeholder="seu@email.com"
                type="email"
                autoComplete="email"
                className="custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col">
                <label className="block text-sm font-bold">Senha</label>
                <input
                  placeholder="Sua senha"
                  type="password"
                  autoComplete="current-password"
                  className="custom-input"
                  // className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right">
                <button
                  onClick={() => navigateToUrl('reset-password')}
                  className="text-sm font-semibold text-slate-600 underline hover:text-slate-800"
                >
                  Esqueceu a senha?
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="button-primary w-full"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 border-t pt-4 text-center text-sm text-slate-600">
            <>
              Não tem uma conta?{" "}
              <button
                onClick={() => navigateToUrl('sign-up')}
                className="font-medium text-blue-600 hover:underline"
              >
                Criar conta
              </button>
            </>
          </div>
        </section>

        <div
          className={`rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 mt-6`}
        >
          <div className="flex items-start gap-3">
            <FiCheckCircle className="mt-0.5" />
            <div>
              <p className="font-medium">Seus dados estão seguros</p>
              <p>Usamos criptografia de ponta para proteger suas informações pessoais e
                financeiras.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
