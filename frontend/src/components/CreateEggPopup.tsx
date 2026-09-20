import spannericon from "../assets/spinnericon.svg";
export interface CreateEggPopupProps {
  title: string;
  description: string;
  unlockDate: string;
  modalvisible: boolean;
  error: string;
  isLoading: boolean;
  memory: string;
  setmodalvisible: (visible: boolean) => void;
  settitle: (title: string) => void;
  setdescription: (desc: string) => void;
  setunlockdate?: (date: string) => void;
  onSubmit?: () => void;
  seterror: (error: string) => void;
  setmemory: (memory: string) => void;
}
export default function CreateEggPopup({
  title,
  description,
  unlockDate,
  modalvisible,
  memory,
  error,
  isLoading,
  setmemory,
  settitle,
  setdescription,
  setmodalvisible,
  onSubmit,
  setunlockdate,
}: CreateEggPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-poppins">
      <div className="w-full max-w-md p-8 rounded-xl bg-(--bg-color) border border-(--dark-brown) shadow-xl flex flex-col gap-4">
        <h2 className="text-[25px] font-semibold text-(--dark-brown)">Create New Egg</h2>
        {error && <div className="w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">{error}</div>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <input
          type="date"
          value={unlockDate}
          onChange={(e) => setunlockdate?.(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <input
          type="text"
          placeholder="Memory"
          value={memory}
          onChange={(e) => setmemory(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
          <button
            disabled={isLoading}
            type="button"
            onClick={onSubmit}
            className="w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            {isLoading ? <img src={spannericon} className="animate-spin h-7 mx-auto" alt="Loading" /> : <span>Create</span>}
          </button>

          <button
            type="button"
            onClick={() => {
              setmodalvisible(false);
              settitle("");
              setdescription("");
              setmemory("");
              setunlockdate?.("");
            }}
            className="w-full border border-(--dark-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
