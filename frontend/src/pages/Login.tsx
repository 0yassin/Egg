import { useEffect, useState } from "react";
import eyeicon from "../assets/eyeicon.svg";
import eyeslashicon from "../assets/eyeslashicon.svg";
import spannericon from "../assets/spinnericon.svg";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


   useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        navigate("/farm")
        return;
      }
    }, []);

  async function handleLogin() {
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      const result = await apiFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      localStorage.setItem("access_token",result.access_token)
      window.location.href = "/farm"
    } catch (e) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="font-poppins min-h-screen min-w-screen justify-center flex p-4">
      <div className="w-full h-fit max-w-md border-(--light-brown)/80 border p-8 rounded-lg gap-3 flex flex-col">
        <h2 className="text-[25px] font-semibold text-(--dark-brown)">Login to your account</h2>
        {error && <div className="w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">{error}</div>}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <div className="flex gap-2 items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
          />
          <button
            className="cursor-pointer p-1 transition-all flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              showPassword == true ? setShowPassword(false) : setShowPassword(true);
            }}
          >
            {showPassword ? <img className="h-8" src={eyeicon} /> : <img className="h-8" src={eyeslashicon} />}
          </button>
        </div>
        <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
          <button
            disabled={isLoading}
            type="button"
            onClick={() => handleLogin()}
            className="w-full h-full disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 text-[20px] font-medium bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            {isLoading ? <img src={spannericon} className="animate-spin h-7 mx-auto" /> : <span>Login</span>}
          </button>
          <a type="button" href={"/register"} className="w-full text-center text-[20px] text-(--dark-brown) py-3  transition-all cursor-pointer">
            Register
          </a>
        </div>
      </div>
    </main>
  );
}
