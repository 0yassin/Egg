import React from "react";

export interface CreateEggPopupProps {
  title: string;
  description: string;
  unlockDate: string;
  media: any[];
  modalvisible: boolean;

  setmodalvisible: (visible: boolean) => void;
  settitle: (title: string) => void;
  setdescription: (desc: string) => void;
  setmedia?: (media: any[]) => void;
  setunlockdate?: (date: string) => void;
  onSubmit?: () => void;
}

export default function CreateEggPopup({
  title,
  description,
  unlockDate,
  media,
  settitle,
  setdescription,
  setmodalvisible,
  onSubmit,
  setunlockdate,
}: CreateEggPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-poppins">
      <div className="w-full max-w-md p-8 rounded-[12px] bg-(--bg-color) border border-(--dark-brown) shadow-xl flex flex-col gap-4">
        <h2 className="text-[25px] font-semibold text-(--dark-brown)">
          Create New Egg
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-[8px] border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-[8px] border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <input
          type="date"
          placeholder="Date"
          value={unlockDate}
          onChange={(e) => setunlockdate(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-[8px] border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        {/* placeholder for drag and drop  */}
        <div className=" cursor-pointer flex justify-center py-8 w-full text-[20px] px-4 text-(--light-brown)/80 bg-(--bg-color) rounded-[8px] border border-(--light-brown)/80">
          <span>Drop pictures or videos here</span>
        </div>

        <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
          <button
            type="button"
            onClick={onSubmit}
            className="w-full bg-(--accent-blue) py-3 rounded-[8px] transition-all cursor-pointer active:scale-95"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => setmodalvisible(false)}
            className="w-full border border-(--dark-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) py-3 rounded-[8px] transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}