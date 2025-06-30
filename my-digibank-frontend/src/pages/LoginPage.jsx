import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("password");
  const navigate = useNavigate();

  const handle = () =>
    user === "admin" && pass === "password"
      ? navigate("/")
      : alert("Invalid!");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input value={user} onChange={(e) => setUser(e.target.value)}
          className="w-full border p-2 mb-4 rounded" placeholder="Username" />
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
          className="w-full border p-2 mb-4 rounded" placeholder="Password" />
        <button onClick={handle}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;