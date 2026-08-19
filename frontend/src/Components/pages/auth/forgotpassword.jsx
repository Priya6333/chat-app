import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/react";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { signIn, isLoaded, setActive } = useSignIn();

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!isLoaded) return;

    try {
      setLoading(true);
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Failed to send reset code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return;

    try {
      setLoading(true);
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/home");
      } else {
        setError("Password reset incomplete");
      }
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline="Reset Password 🔑"
      description="Don't worry! Enter your registered email address to receive password reset instructions."
    >
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {!submitted
              ? "Enter your email to receive a verification code."
              : "Enter the verification code and your new password."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSendResetCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Reset Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}