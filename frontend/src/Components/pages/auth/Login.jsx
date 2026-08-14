import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login credentials
    const dummyEmail = "priyanka@gmail.com";
    const dummyPassword = "123456";

    if (email === dummyEmail && password === dummyPassword) {
      alert("Login successful! 🎉");

      navigate("/home");
    } else {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-12 flex-col justify-center">

          <div className="flex items-center gap-4 mb-7">

            {/* Instagram Logo */}
            <div className="w-16 h-16 rounded-[18px] bg-white/20 flex items-center justify-center">

              <div className="w-11 h-11 rounded-[13px] border-[3px] border-white relative">

                <div className="absolute w-4 h-4 rounded-full border-[3px] border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                </div>

                <div className="absolute w-2 h-2 rounded-full bg-white top-1 right-1">
                </div>

              </div>

            </div>

            <h1 className="text-5xl font-bold">
              Instagram
            </h1>

          </div>

          <h2 className="text-3xl font-semibold mb-4">
            Connect. Share. Chat.
          </h2>

          <p className="text-white/80 text-lg leading-relaxed">
            Connect with your friends, share your moments,
            discover new people and chat in real-time.
          </p>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="p-8 sm:p-12">

          <div className="max-w-sm mx-auto">

            {/* Mobile Logo */}
            <div className="md:hidden flex flex-col items-center mb-8">

              <div className="w-20 h-20 rounded-[22px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg">

                <div className="w-12 h-12 rounded-[15px] border-[4px] border-white relative">

                  <div className="absolute w-5 h-5 rounded-full border-[3px] border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  </div>

                  <div className="absolute w-2.5 h-2.5 rounded-full bg-white top-1 right-1">
                  </div>

                </div>

              </div>

              <h1 className="mt-3 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Instagram
              </h1>

            </div>


            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mb-8">
              Login to continue to Instagram
            </p>


            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />

              </div>


              {/* Password */}
              <div>

                <div className="flex justify-between mb-2">

                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition shadow-lg shadow-purple-200"
              >
                Login
              </button>

            </form>


            {/* Divider */}
            <div className="flex items-center gap-4 my-7">

              <div className="h-px bg-gray-200 flex-1"></div>

              <span className="text-sm text-gray-400">
                OR
              </span>

              <div className="h-px bg-gray-200 flex-1"></div>

            </div>


            {/* Google */}
            <button
              type="button"
              className="w-full py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>


            {/* Register */}
            <p className="text-center text-sm text-gray-500 mt-8">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-purple-600 font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>


           {/* Demo Credentials */}
<div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-xl">
  <p className="text-sm font-semibold text-purple-700 mb-2">
    Demo Login Credentials
  </p>

  <p className="text-sm text-gray-600">
    <span className="font-medium">Email:</span>{" "}
    priyanka@gmail.com
  </p>

  <p className="text-sm text-gray-600 mt-1">
    <span className="font-medium">Password:</span>{" "}
    123456
  </p>
</div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;