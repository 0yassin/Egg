import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lockicon from "../assets/lock-icon.png"

export interface MemoryResponse {
    id:number,
    egg_id: number,
    title: string,
    content:string,
}

export function EggDetails(){
    const id = useParams<{id:string}>()
    // TODO: hook to backend
    const token ="";
    const [memories, setMemories] = useState<MemoryResponse[]>([])
    const [pageLoading, setpageloading] = useState(true);
    const [error, setError] = useState("")
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    useEffect(()=>{
        async function fetchMemories() {
            try {
                setpageloading(true)
                setError("");
                // TODO: verify this works and use proper endpoint
                const response = await fetch(`/api/eggs/${id}/memories`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    if (response.status === 422) throw new Error("Invalid Egg ID");
                        throw new Error("Failed to load egg contents.");
                }
                const data: MemoryResponse[] = await response.json();
                setMemories(data);
                setIsUnlocked(true);
            } catch (e) {
                setError(e.message || "Egg is locked or unavailable.");
            } finally {
                setpageloading(false)
            }}
        if (id) fetchMemories();
    }, [id, token])

    if (pageLoading) {
        return (
            <main className="min-h-screen font-poppins flex justify-center items-center gap-3">
                <p className="text-[20px] text-(--dark-brown)">Loading Time Capsule...</p>

                <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#5c4a42" d="M286.7 96.1C291.7 113 282.1 130.9 265.2 135.9C185.9 159.5 128.1 233 128.1 320C128.1 426 214.1 512 320.1 512C426.1 512 512.1 426 512.1 320C512.1 233.1 454.3 159.6 375 135.9C358.1 130.9 348.4 113 353.5 96.1C358.6 79.2 376.4 69.5 393.3 74.6C498.9 106.1 576 204 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 204 141.1 106.1 246.9 74.6C263.8 69.6 281.7 79.2 286.7 96.1z"/></svg>
            </main>
        );
    }

    return(
        <>
            <main className="min-h-screen font-poppins px-6 py-12 max-w-5xl mx-auto flex flex-col items-center">
                <div className="w-full text-center mb-12">
                    <h1 className="text-[40px] font-bold text-(--dark-brown) mb-2">Egg #{id.id}</h1>
                </div>
                {!isUnlocked ? 
                    (
                        <div className="w-full max-w-2xl border border-(--light-brown) p-10 rounded-lg flex flex-col justify-center items-center">
                            <img src={lockicon} className="h-16 mb-2" />
                            <h2 className="text-[22px] font-medium text-(--dark-brown) mb-2 text-center">
                                This Egg is locked!
                            </h2>
                            <p className="text-(--light-brown)">Memories will automatically unlock when the target date arrives.</p>
                        </div>
                    )
                    :
                    (
                        <div className="w-full flex flex-col items-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {memories.map((mem) => (
                                <div key={mem.id} className="p-6 bg-white rounded-xl border border-(--light-brown)/30 shadow-sm">
                                    <h3 className="text-[18px] font-semibold text-(--dark-brown) mb-2">{mem.title}</h3>
                                    <p className="text-(--light-brown) whitespace-pre-wrap">{mem.content}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    )
}