import { useState } from "react";
import { useAuth } from "../contexts/useAuth";

export function Login() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn(email, password);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-moss-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-moss-700 mb-4">VerdeConta 🇵🇹</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-moss-600 hover:bg-moss-700 text-white py-2 rounded-lg transition">
          Entrar
        </button>
      </form>
    </div>
  );
}
