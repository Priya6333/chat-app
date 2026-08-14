import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    console.log("Reset password email:", email);

    // OTP page
    navigate("/verify-otp");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

        {/* ================= LOGO ================= */}
        <div className="flex flex-col items-center mb-8">

          {/* Instagram Logo */}
          <div className="w-20 h-20 rounded-[22px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">

            <div className="w-12 h-12 rounded-[15px] border-[4px] border-white relative">

              {/* Camera Lens */}
              <div className="absolute w-5 h-5 rounded-full border-[3px] border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              </div>

              {/* Camera Dot */}
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white top-1 right-1">
              </div>

            </div>

          </div>

          <h1 className="mt-3 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Instagram
          </h1>

        </div>


        {/* ================= HEADING ================= */}
        <div className="text-center mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password?
          </h2>

          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Enter your email address and we'll send you
            a verification code to reset your password.
          </p>

        </div>


        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
            />

          </div>


          {/* Send OTP */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition shadow-lg shadow-purple-200"
          >
            Send OTP
          </button>

        </form>


        {/* ================= BACK TO LOGIN ================= */}
        <p className="text-center text-sm text-gray-500 mt-7">

          Remember your password?{" "}

          <Link
            to="/"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;