import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-12 flex-col justify-center">

          <h1 className="text-5xl font-bold mb-6">
            ChatApp
          </h1>

          <h2 className="text-3xl font-semibold mb-4">
            Connect. Share. Chat.
          </h2>

          <p className="text-white/80 text-lg leading-relaxed">
            Connect with your friends, share your moments,
            discover new people and chat in real-time.
          </p>

          <div className="mt-10 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20"></div>
            <div className="w-10 h-10 rounded-full bg-white/20"></div>
            <div className="w-10 h-10 rounded-full bg-white/20"></div>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12">

          <div className="max-w-sm mx-auto">

            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                ChatApp
              </h1>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mb-8">
              Login to continue to ChatApp
            </p>

            <form className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
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
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Google */}
            <button className="w-full py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
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

          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;