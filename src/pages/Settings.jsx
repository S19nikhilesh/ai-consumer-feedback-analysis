import { useState } from "react";
import { User, Bell, Palette, Save } from "lucide-react";

const Settings = () => {

  const [name, setName] = useState("Nikhilesh");
  const [email, setEmail] = useState("nikhilesh@example.com");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [analysisNotifications, setAnalysisNotifications] = useState(true);

  const [theme, setTheme] = useState("Light");

  const [saved, setSaved] = useState(false);


  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };


  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Settings
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account and application preferences.
        </p>

      </div>


      <div className="max-w-4xl space-y-6">


        {/* ================= PROFILE ================= */}

        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="flex items-center gap-3 p-6 border-b border-slate-200">

            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">

              <User
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Profile
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                Manage your account information.
              </p>

            </div>

          </div>


          <div className="p-6 space-y-5">

            {/* Name */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full max-w-xl border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-xl border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Role */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Role
              </label>

              <input
                type="text"
                value="CSE Student"
                disabled
                className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-500"
              />

            </div>

          </div>

        </div>


        {/* ================= NOTIFICATIONS ================= */}

        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="flex items-center gap-3 p-6 border-b border-slate-200">

            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">

              <Bell
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Notifications
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                Control when you receive notifications.
              </p>

            </div>

          </div>


          <div className="p-6 space-y-5">


            {/* Email Notifications */}

            <div className="flex items-center justify-between gap-6">

              <div>

                <p className="text-sm font-medium text-slate-800">
                  Email notifications
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Receive important updates through email.
                </p>

              </div>


              <button
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                className={`relative w-11 h-6 rounded-full transition ${
                  emailNotifications
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >

                <span
                  className={`absolute top-1 h-4 w-4 bg-white rounded-full transition ${
                    emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>


            {/* Analysis Notifications */}

            <div className="flex items-center justify-between gap-6">

              <div>

                <p className="text-sm font-medium text-slate-800">
                  Analysis notifications
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Get notified when feedback analysis is completed.
                </p>

              </div>


              <button
                onClick={() =>
                  setAnalysisNotifications(!analysisNotifications)
                }
                className={`relative w-11 h-6 rounded-full transition ${
                  analysisNotifications
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >

                <span
                  className={`absolute top-1 h-4 w-4 bg-white rounded-full transition ${
                    analysisNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          </div>

        </div>


        {/* ================= APPEARANCE ================= */}

        <div className="bg-white border border-slate-200 rounded-xl">

          <div className="flex items-center gap-3 p-6 border-b border-slate-200">

            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">

              <Palette
                size={18}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-slate-900">
                Appearance
              </h3>

              <p className="text-xs text-slate-500 mt-0.5">
                Choose how the application looks.
              </p>

            </div>

          </div>


          <div className="p-6">

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Theme
            </label>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full max-w-xl border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="Light">
                Light
              </option>

              <option value="Dark">
                Dark
              </option>

              <option value="System">
                System Default
              </option>

            </select>

          </div>

        </div>


        {/* ================= SAVE ================= */}

        <div className="flex items-center justify-end gap-4">

          {saved && (
            <p className="text-sm text-green-600">
              Settings saved successfully.
            </p>
          )}


          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >

            <Save size={16} />

            Save Changes

          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;