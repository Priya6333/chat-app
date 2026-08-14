import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const [privateAccount, setPrivateAccount] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b ${
          darkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-full transition ${
              darkMode
                ? "hover:bg-gray-800"
                : "hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">
              Settings
            </h1>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your ChatApp account and preferences
            </p>
          </div>

        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* Account */}
        <section
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Account
            </h2>
          </div>

          <div
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-100"
            }`}
          >

            <button
              onClick={() => navigate("/edit-profile")}
              className={`w-full flex items-center justify-between p-5 text-left transition ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <div>
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm text-gray-500">
                  Change your profile information
                </p>
              </div>

              <span className="text-xl">›</span>
            </button>

            <button
              className={`w-full flex items-center justify-between p-5 text-left transition ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update your account password
                </p>
              </div>

              <span className="text-xl">›</span>
            </button>

            <button
              className={`w-full flex items-center justify-between p-5 text-left transition ${
                darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <div>
                <p className="font-medium">Email & Phone</p>
                <p className="text-sm text-gray-500">
                  Manage contact information
                </p>
              </div>

              <span className="text-xl">›</span>
            </button>

          </div>
        </section>

        {/* Privacy */}
        <section
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Privacy
            </h2>
          </div>

          <div
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-100"
            }`}
          >

            {/* Private Account */}
            <div className="flex items-center justify-between p-5">

              <div>
                <p className="font-medium">
                  Private Account
                </p>

                <p className="text-sm text-gray-500">
                  Only approved followers can see your posts
                </p>
              </div>

              <button
                onClick={() =>
                  setPrivateAccount(!privateAccount)
                }
                className={`w-12 h-6 rounded-full transition ${
                  privateAccount
                    ? "bg-purple-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                    privateAccount
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>

            </div>

            {/* Activity Status */}
            <div className="flex items-center justify-between p-5">

              <div>
                <p className="font-medium">
                  Activity Status
                </p>

                <p className="text-sm text-gray-500">
                  Show when you are active
                </p>
              </div>

              <button
                onClick={() =>
                  setActivityStatus(!activityStatus)
                }
                className={`w-12 h-6 rounded-full transition ${
                  activityStatus
                    ? "bg-purple-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                    activityStatus
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>

            </div>

          </div>
        </section>

        {/* Notifications */}
        <section
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Notifications
            </h2>
          </div>

          <div className="flex items-center justify-between p-5">

            <div>
              <p className="font-medium">
                Message Notifications
              </p>

              <p className="text-sm text-gray-500">
                Receive notifications for new messages
              </p>
            </div>

            <button
              onClick={() =>
                setMessageNotifications(
                  !messageNotifications
                )
              }
              className={`w-12 h-6 rounded-full transition ${
                messageNotifications
                  ? "bg-purple-600"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                  messageNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>
        </section>

        {/* Appearance */}
        <section
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Appearance
            </h2>
          </div>

          <div className="flex items-center justify-between p-5">

            <div>
              <p className="font-medium">
                Dark Mode
              </p>

              <p className="text-sm text-gray-500">
                Change the appearance of ChatApp
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition ${
                darkMode
                  ? "bg-purple-600"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                  darkMode
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>
        </section>

        {/* Account Actions */}
        <section
          className={`rounded-2xl border overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`p-5 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-lg font-semibold">
              Account Actions
            </h2>
          </div>

          <div
            className={`divide-y ${
              darkMode ? "divide-gray-700" : "divide-gray-100"
            }`}
          >

            <button className="w-full text-left p-5 text-red-500 hover:bg-red-50 transition">
              Logout
            </button>

            <button className="w-full text-left p-5 text-red-600 hover:bg-red-50 transition">
              Delete Account
            </button>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Settings; 