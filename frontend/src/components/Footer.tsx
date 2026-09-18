export default function Footer(){
    return(
        <div className="w-screen px-32 py-12 bg-(--light-brown) font-poppins">
            <div className="h-full w-full flex justify-between">
                {/* links */}
                <div className="text-[22px] font-medium  flex gap-12 ">
                    <div className="flex flex-col gap-3">
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/">home</a>
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/farm">farm</a>
                        <a className= "text-(--bg-color)/75 hover:text-(--bg-color) transition-colors" href="/account">account</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a
                            href="/register"
                            className=" text-white w-full text-center bg-(--accent-blue) py-2 px-6 rounded-lg transition-all cursor-pointer active:scale-95 ">
                            register
                        </a>
                        <a
                            href="/login"
                            className="text-(--bg-color)/75 hover:text-(--bg-color) w-full text-lefts py-2 text-center rounded-lg transition-colors cursor-pointer active:scale-95">
                            login
                        </a>

                    </div>

                </div>
                {/* typography */}
                <div className="text-(--bg-color)/75 font-black text-7xl flex items-end">
                    <a href="/">Egg</a>
                </div>
            </div>
        </div>
    )
}