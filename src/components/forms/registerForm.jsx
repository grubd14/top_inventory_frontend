import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "/src/api/api";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.username.trim() || !formData.password.trim()) {
        throw new Error("Username and password are required");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const response = await registerUser({
        username: formData.username,
        password: formData.password,
        role: "user",
      });

      if (response) {
        const userToStore = response.user ?? {
          username: formData.username,
          role: "user",
        };
        localStorage.setItem("user", JSON.stringify(userToStore));
        navigate("/category");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="username">
            Username
          </label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            type="text"
            placeholder="Choose a username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            type="password"
            id="password"
            name="password"
            placeholder="Enter a password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded text-sm">
          You are registering as a regular user. Administrators must be assigned
          by the system.
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-sky-600 py-2.5 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
