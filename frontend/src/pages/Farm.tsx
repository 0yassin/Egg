import CreateEggCard from "../components/CreateEggCard";
import Eggcard from "../components/Eggcard";
import type { EggCardProps } from "../components/Eggcard";

const cardsData: EggCardProps[] = [
    { title: "birthday", description: "my 15th birthday", unlockDate: "unlocks in 2 days" , isLocked:true},
    { title: "Team building event", description: "pictures from event with new collegues", unlockDate: "unlocks in 2 years" , isLocked:true},
    { title: "Project launch", description: "luanching our first project together", unlockDate: "unlocks in 5 months" , isLocked:true},
    { title: "Graduation day", description: "the day I graduated highschool", unlockDate: "unlocks in 10 days" , isLocked:true},
]
export function Farm(){
    return(
        <main className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardsData.map((card, index)=>(
                    <Eggcard unlockDate={card.unlockDate} title={card.title} description={card.description} isLocked={card.isLocked} onClick={()=>{}} />
                ))}
                <CreateEggCard />
            </div>
        </main>
    )
}