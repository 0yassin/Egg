export default function Footer(){
    return(
        <div className=" lg:px-32 px-8 py-12 bg-(--light-brown) font-poppins ">
            <div className="h-full w-full flex justify-between">
                {/* links */}
                <div className="text-[22px] font-medium  flex-col flex md:flex-row gap-6 md:gap-12  ">
                    <div className="flex flex-col gap-3">
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/">Home</a>
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/farm">Farm</a>
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/account">Account</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a
                            href="/register"
                            className=" text-white w-full text-center bg-(--accent-blue) py-2 px-6 rounded-lg transition-all cursor-pointer active:scale-95 ">
                            Register
                        </a>
                        <a
                            href="/login"
                            className="text-(--bg-color)/75 hover:text-(--bg-color) w-full text-left py-2 md:text-center rounded-lg transition-colors cursor-pointer active:scale-95">
                            Login
                        </a>

                    </div>

                </div>
                {/* typography */}
                <div className="text-(--accent-blue) font-black text-5xl flex items-end uppercase">
                    <a href="/">Egg</a>
                </div>
            </div>
        </div>
    )
}