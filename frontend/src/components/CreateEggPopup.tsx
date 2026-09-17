export interface CreateEggPopupProps {
  title: string;
  description: string;
  unlockDate: string;
  onClick?: () => void;
  media: any;
}

export default function CreateEggPopup() {
  return (
    <div className="fixed font-poppins inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-(--bg-color) border border-(--dark-brown) shadow-xl flex flex-col gap-4">
        <h2 className="text-[25px] font-semibold text-(--dark-brown)">Create New Egg</h2>
        
        <input 
          type="text" 
          placeholder="Title" 
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-[11px] border border-(--dark-brown) outline-none"
        />

        <div className="flex justify-end gap-3 mt-4">

        </div>
      </div>

    </div>
  );
}