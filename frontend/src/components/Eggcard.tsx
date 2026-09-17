import lockicon from '../assets/lock-icon.png'

export interface EggCardProps {
  title: string;
  description: string;
  unlockDate: string;
  isLocked?: boolean;
  onClick?: () => void;
}

export default function Eggcard({title, description, isLocked, onClick, unlockDate}: EggCardProps){
    return(
        <div className="border flex flex-col gap-3 rounded-xl hover:bg-(--border-color)/25 transition-colors border-(--dark-brown) py-3 px-6 max-w-80 w-screen cursor-pointer">
            <div className="flex flex-col">
                <span className="text-[28px] text-(--dark-brown)">{title}</span>
                <span className="text-[17.5px] text-(--light-brown)">{description}</span>
            </div>
            <div className="flex justify-between w-full content-center items-center">
                <span className="text-[17.5px] text-center text-(--light-brown)">{unlockDate}</span>
                <span>
                    {isLocked && <img src={lockicon} className='h-8 w-8'/>}
                </span>
            </div>
        </div>
    )
}