import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/react";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const navigate = useNavigate();
  const { signUp, isLoaded, setActive } = useSignUp();
  const clerk = useClerk();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoaded === false) {
      setError("Clerk is loading, please wait...");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    const cleanUsername = username.startsWith("@")
      ? username.slice(1).trim()
      : username.trim();

    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password: password,
        username: cleanUsername || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (otpCode.trim().length < 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      setLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/home");
      } else {
        setError("Verification incomplete. Please check your details.");
      }
    } catch (err) {
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Invalid verification code"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setError("");
      alert("Verification code has been resent to your email.");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to resend code.");
    }
  };

  const handleGoogleSignUp = async () => {
    console.log("Google Sign-Up button clicked!");
    setError("");

    try {
      if (typeof signUp?.authenticateWithRedirect === "function") {
        await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/home",
        });
      } else if (
        typeof clerk?.client?.signUp?.authenticateWithRedirect === "function"
      ) {
        await clerk.client.signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/home",
        });
      } else if (typeof clerk?.redirectToSignUp === "function") {
        await clerk.redirectToSignUp({
          signUpForceRedirectUrl: "/home",
        });
      } else {
        throw new Error(
          "Clerk Google authentication is initializing. Please refresh and try again."
        );
      }
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          err.message ||
          "Google Sign-Up failed"
      );
    }
  };

  return (
    <AuthLayout
      headline="Join the Community 🚀"
      description="Create your account and start connecting with friends, sharing moments, and chatting in real-time."
      showDots={true}
    >
      <div className="w-full max-w-sm mx-auto">
        {!pendingVerification ? (
          <>
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium">
                Join Instagram and connect with everyone
              </p>
            </div>

            {error && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2">
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

            <form onSubmit={handleRegister} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="@username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-start gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-600 cursor-pointer select-none leading-tight"
                >
                  I agree to the{" "}
                  <span className="text-purple-600 font-semibold hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-600 font-semibold hover:underline">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-gray-200" />
              <span className="absolute bg-white px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 text-gray-700 font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span className="text-xs sm:text-sm">Continue with Google</span>
            </button>

            <p className="text-center text-xs text-gray-500 mt-3 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        ) : (
          <div className="py-2">
            <div className="mb-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Verify Your Email
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                We've sent a 6-digit verification code to{" "}
                <span className="font-semibold text-gray-800">{email}</span>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 text-center">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="123456"
                  required
                  className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#9333ea] via-[#ec4899] to-[#f43f5e] hover:opacity-95 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
              <p>
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-purple-600 font-bold hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              </p>
              <button
                type="button"
                onClick={() => setPendingVerification(false)}
                className="text-gray-400 hover:text-gray-600 hover:underline cursor-pointer block mx-auto"
              >
                ← Back to Registration
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}