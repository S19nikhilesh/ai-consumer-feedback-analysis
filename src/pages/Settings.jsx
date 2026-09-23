import { useEffect, useState } from "react";
import { User, Save } from "lucide-react";
import { updateProfile } from "../services/api";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        setName(user.name || "");
        setEmail(user.email || "");
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }
  }, []);

  const handleSave = async () => {
    setSaved(false);
    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await updateProfile(name, email, token);

      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("userUpdated"));

      setName(data.user.name);
      setEmail(data.user.email);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      setError(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Settings
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Manage your account information.
        </p>

      </div>


      <div className="max-w-4xl">

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


        {/* ================= SAVE ================= */}

        <div className="flex items-center justify-end gap-4 mt-6">

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {saved && (
            <p className="text-sm text-green-600">
              Settings saved successfully.
            </p>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg text-sm font-medium transition ${
              saving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            <Save size={16} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;