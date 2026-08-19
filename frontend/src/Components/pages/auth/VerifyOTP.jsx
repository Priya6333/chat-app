import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useSignIn } from "@clerk/react";
import AuthLayout from "./AuthLayout";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, isLoaded: signUpLoaded, setActive: setSignUpActive } = useSignUp();
  const { signIn, isLoaded: signInLoaded, setActive: setSignInActive } = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      setLoading(true);

      if (signUpLoaded && signUp?.status === "missing_requirements") {
        const res = await signUp.attemptEmailAddressVerification({ code: otp });
        if (res.status === "complete") {
          await setSignUpActive({ session: res.createdSessionId });
          navigate("/home");
          return;
        }
      }

      if (signInLoaded && signIn?.status === "needs_first_factor") {
        const res = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otp,
        });
        if (res.status === "complete") {
          await setSignInActive({ session: res.createdSessionId });
          navigate("/home");
          return;
        }
      }

      navigate("/home");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline="Verify Account 🔒"
      description="Enter the verification code sent to your email to complete your authentication."
    >
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 mb-3">
            <div className="w-8 h-8 rounded-lg border-[2px] border-white relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border-[1.5px] border-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 text-center">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="w-full px-4 py-3.5 text-center text-2xl tracking-[0.5em] font-bold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          <Link
            to="/login"
            className="text-purple-600 font-bold hover:underline"
          >
            ← Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}