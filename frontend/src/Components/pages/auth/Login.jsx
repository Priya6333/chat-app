import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn, useClerk } from "@clerk/react";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn, isLoaded, setActive } = useSignIn();
  const clerk = useClerk();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoaded === false) {
      setError("Clerk is loading, please wait...");
      return;
    }

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/home");
      } else {
        navigate("/verify-otp");
      }
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In button clicked!", {
      signIn,
      clerkClient: clerk?.client,
    });
    setError("");

    try {
      if (typeof signIn?.authenticateWithRedirect === "function") {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/home",
        });
      } else if (
        typeof clerk?.client?.signIn?.authenticateWithRedirect === "function"
      ) {
        await clerk.client.signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/home",
        });
      } else if (typeof clerk?.redirectToSignIn === "function") {
        await clerk.redirectToSignIn({
          signInForceRedirectUrl: "/home",
        });
      } else {
        throw new Error(
          "Clerk Google authentication is initializing. Please refresh and try again."
        );
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      const errMsg =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        err.message ||
        "Google Sign-In failed.";
      setError(errMsg);
    }
  };

  return (
    <AuthLayout
      headline="Connect. Share. Chat."
      description="Connect with your friends, share your moments, discover new people and chat in real-time."
    >
      <div className="w-full max-w-sm mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            Welcome Back <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">
            Login to continue to Instagram
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-200" />
          <span className="absolute bg-white px-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 text-gray-700 font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="text-sm">Continue with Google</span>
        </button>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6 font-medium">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}