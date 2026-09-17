import Eggcard from "../components/Eggcard";

export function Farm(){
    return(
        <main className="p-8">
            <Eggcard unlockDate="in 10 days" title="Birthday" description="my 15th birthday" isLocked={true} onClick={()=>{}} />
        </main>
    )
}