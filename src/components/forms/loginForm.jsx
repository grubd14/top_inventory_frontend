import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "/src/api/api";

export const LoginForm = () => {
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

      const response = await loginUser({
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });

      if (response) {
        // Save user info to localStorage so navbar can read it
        const userToStore = response.user ?? {
          username: formData.username,
          role: formData.role,
        };
        localStorage.setItem("user", JSON.stringify(userToStore));
        navigate("/category");
      } else {
        throw new Error("Login failed - no user data returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
            placeholder="Enter your username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {/* Role Selection */}
        <fieldset className="border rounded-lg p-3">
          <legend className="text-sm font-semibold">Select your role:</legend>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="admin" className="ml-2 cursor-pointer">
                Admin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="user" className="ml-2 cursor-pointer">
                User
              </label>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-sky-600 py-2.5 font-medium text-white transition hover:bg-sky-700 disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
