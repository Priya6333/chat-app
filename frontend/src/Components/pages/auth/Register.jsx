import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-12 flex-col justify-center">

          <h1 className="text-5xl font-bold mb-6">
            ChatApp
          </h1>

          <h2 className="text-3xl font-semibold mb-4">
            Join the Community 🚀
          </h2>

          <p className="text-white/80 text-lg leading-relaxed">
            Create your account and start connecting with
            friends, sharing moments, and chatting in real-time.
          </p>

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
              Create Account
            </h2>

            <p className="text-gray-500 mb-8">
              Join ChatApp and connect with everyone
            </p>

            <form className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="@username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 text-sm text-gray-500 pt-1">
                <input
                  type="checkbox"
                  className="mt-1 accent-purple-600"
                />

                <p>
                  I agree to the Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Register */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition shadow-lg shadow-purple-200"
              >
                Create Account
              </button>

            </form>

            {/* Login */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-purple-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Register;