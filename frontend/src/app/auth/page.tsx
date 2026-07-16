"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { loginUser, registerUser } from "../../lib/api";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        await registerUser(email, password, name);
      }

      const res = await loginUser(email, password);

      if (res.success) {
        login(res.data.token);
        router.push("/");
      } else {
        setError(res.message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-line p-10">
        <h1 className="font-display text-3xl mb-2">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-ivory/50 text-sm mb-8">
          {mode === "login"
            ? "Access your compensation intelligence dashboard."
            : "Register to start benchmarking compensation."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent border border-line px-4 py-3 text-sm focus:outline-none focus:border-sand"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border border-line px-4 py-3 text-sm focus:outline-none focus:border-sand"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent border border-line px-4 py-3 text-sm focus:outline-none focus:border-sand"
          />

          {error && (
            <p className="text-sm text-red-400 border border-red-400/30 px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-ivory text-charcoal font-sans text-[11px] uppercase tracking-widest2 py-3 hover:bg-sand transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
          className="mt-6 text-sm text-ivory/50 hover:text-ivory underline underline-offset-4"
        >
          {mode === "login"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}