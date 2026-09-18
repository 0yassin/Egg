import editicon from "../assets/editicon.svg"

export function Account(){

    function editdisplayname(){}
    function editusername(){}
    function editemail(){}
    function resetpassword(){}

    return(
        <main className="p-4 font-poppins flex justify-center">
            <div className="w-full max-w-2xl py-6 px-9 border border-(--light-brown) rounded-xl">
                <div className="flex gap-6 content-center items-center mb-4">
                    <span className="text-[25px] text-(--dark-brown) font-medium">username</span>
                    <img className="h-6 cursor-pointer" src={editicon} onClick={(e)=>{e.preventDefault(); editdisplayname()}} />
                </div>
                <div className="gap-2 flex-col flex">
                    <button
                        onClick={()=>editusername()}
                        type="button"
                        className="w-full text-[20px] bg-(--light-brown) text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-98">
                        change username
                    </button>
                    <button
                        onClick={()=>editemail()}
                        type="button"
                        className="w-full text-[20px] bg-(--light-brown) text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-98">
                        change email
                    </button>
                    <button
                        onClick={()=>resetpassword()}
                        type="button"
                        className="w-full text-[20px] bg-(--light-brown) text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-98">
                        reset password
                    </button>
                </div>
            </div>
        </main>
    )
}