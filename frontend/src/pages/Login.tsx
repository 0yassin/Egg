import { useState } from "react"

export function Login(){

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    function Login(){}

    return(
        <main className="font-poppins min-h-screen min-w-screen justify-center flex p-4">
            <div className="w-full h-fit max-w-md border-(--light-brown)/80 border p-8 rounded-lg gap-3 flex flex-col">
                <h2 className="text-[25px] font-semibold text-(--dark-brown)">
                    Login to your account
                </h2>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
                    />
                    <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
                        <button
                            type="button"
                            onClick={()=>Login()}
                            className="w-full text-[20px] font-medium bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
                        >
                            Login
                        </button>
                        <a
                            type="button"
                            href={"/register"}
                            className="w-full text-center text-[20px] text-(--dark-brown) py-3  transition-all cursor-pointer"
                        >
                            Register Instead
                        </a>
                        </div>
            </div>
        </main>
    )
}