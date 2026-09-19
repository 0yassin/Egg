import { useState } from "react"
import eyeicon from "../assets/eyeicon.svg"
import eyeslashicon from "../assets/eyeslashicon.svg"

export function Register(){

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [displayname, setdisplayname] = useState("")
    const [email, setemail] = useState("")

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const isValidUsername = (str: string) => /^[a-zA-Z0-9_-]{3,20}$/.test(str);
    const sanitizeInput = (str: string) => str.normalize("NFKC").trim();
    const isValidDisplayName = (str: string) => /^[\p{L}\p{N}\s'-]{2,30}$/u.test(str);
    
    async function handleRegister(){
        setError("");
        const cleanEmail = sanitizeInput(email);
        const cleanDisplayName = sanitizeInput(displayname);
        const cleanUsername = sanitizeInput(username);
        const cleanPassword = password.trim();
        if (!cleanEmail || !cleanDisplayName || !cleanUsername || !cleanPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (!isValidUsername(cleanUsername)) {
            setError("Username can only contain letters, numbers, _, and - (3-20 chars).");
            return;
        }
        if (!isValidDisplayName(cleanDisplayName)) {
            setError("Display name contains invalid characters or symbols.");
            return;
        }
        if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
            setError("Please enter a valid email address.");
            return;
        }
        if (cleanPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // TODO: link to actual backend
            // window.location.href = "/login";
        }
        catch (e) {
            setError("Please make sure your details are valid")
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <main className="font-poppins min-h-screen min-w-screen justify-center flex p-4 pt-8">
            <div className="w-full h-fit max-w-md border-(--light-brown)/80 border p-8 rounded-lg gap-3 flex flex-col">
                <h2 className="text-[25px] font-semibold text-(--dark-brown)">
                    Create your account
                </h2>
                {error && (
                    <div className="w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">
                        {error}
                    </div>
                )}
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
                    />
                    <input
                        type="text"
                        placeholder="display name"
                        value={displayname}
                        onChange={(e) => setdisplayname(e.target.value)}
                        className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
                    />

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
                        <button className="cursor-pointer p-1 transition-all flex items-center justify-center" onClick={(e)=>{e.preventDefault(); showPassword==true?setShowPassword(false) : setShowPassword(true)}}>
                            {showPassword? 
                                <img className="h-8" src={eyeicon} />
                                :
                                <img className="h-8" src={eyeslashicon} />
                            }
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
                        <button
                            disabled={isLoading}
                            type="button"
                            onClick={()=>handleRegister()}
                            className="w-full h-full disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 text-[20px] font-medium bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
                        >
                            {isLoading? 
                                <img src={eyeicon} className="animate-spin h-7 mx-auto" />
                                :
                                <span>Register</span>
                            }
                        </button>
                        <a
                            type="button"
                            href={"/login"}
                            className="w-full text-center text-[20px] text-(--dark-brown) py-3  transition-all cursor-pointer"
                        >
                            Login
                        </a>
                    </div>
            </div>
        </main>
    )
}