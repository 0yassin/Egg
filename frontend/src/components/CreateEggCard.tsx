export interface CreateEggCardProps {
    onClick?: () => void;
}

export default function CreateEggCard({onClick}:CreateEggCardProps){
    return(
        <div className="border font-poppins rounded-xl  w-full h-full bg-(--accent-blue) py-3 px-6  cursor-pointer">
            <div className="flex gap-6 font-medium text-(--bg-color) w-full h-full items-center justify-center">
                <span className="text-[28px]">Create new</span>
                <span className="text-[28px]">+</span>
            </div>

        </div>
    )
}