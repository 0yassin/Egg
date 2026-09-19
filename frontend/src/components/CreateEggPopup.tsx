import React from "react";
import {useDropzone} from "react-dropzone"
import spannericon from "../assets/spinnericon.svg"

export interface CreateEggPopupProps {
  title: string;
  description: string;
  unlockDate: string;
  media: any[];
  modalvisible: boolean;
  error: string;
  isLoading: boolean;

  setmodalvisible: (visible: boolean) => void;
  settitle: (title: string) => void;
  setdescription: (desc: string) => void;
  setmedia?: (media: any[]) => void;
  setunlockdate?: (date: string) => void;
  onSubmit?: () => void;
  seterror: (error: string) => void;
}

export default function CreateEggPopup({
  title,
  description,
  unlockDate,
  media,
  error,
  isLoading,
  settitle,
  setdescription,
  setmodalvisible,
  onSubmit,
  setunlockdate,
  setmedia,
}: CreateEggPopupProps) {

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      "video/*": [".mp4", ".mov", ".webm"],
    },
    onDrop: (acceptedFiles) => {
      if (setmedia) {
        setmedia([...media, ...acceptedFiles]);
      }
    },
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-poppins">
      <div className="w-full max-w-md p-8 rounded-xl bg-(--bg-color) border border-(--dark-brown) shadow-xl flex flex-col gap-4">
        <h2 className="text-[25px] font-semibold text-(--dark-brown)">
          Create New Egg
        </h2>

        {error && (
          <div className="w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">
            {error}
          </div>
        )}

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
          placeholder="Date"
          value={unlockDate}
          onChange={(e) => setunlockdate(e.target.value)}
          className="w-full text-[17.5px] px-4 py-3 text-(--light-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
        />
        
        <div
          {...getRootProps()}
          className={`cursor-pointer flex flex-col items-center justify-center py-6 px-4 w-full text-[16px] text-(--light-brown)/80 bg-(--bg-color) rounded-lg border border-dashed transition-all ${
            isDragActive ? "border-(--dark-brown) bg-(--light-brown)/10" : "border-(--light-brown)/80"
          }`}
        >
          <input {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
          
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="text-center">
              <p>Drop pictures or videos here, or click to select files</p>
            </div>
          )}

          {media.length > 0 && (
            <div className="mt-3 text-xs text-(--dark-brown) font-medium">
              {media.length} file(s) selected
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-3 w-full text-(--bg-color)">
          <button
              disabled={isLoading}
              type="button"
              onClick={onSubmit}
              className="w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            {isLoading? 
              <img src={spannericon} className="animate-spin h-7 mx-auto" />
                :
                <span>Create</span>
            }
          </button>
          <button
            type="button"
            onClick={() => {setmodalvisible(false); settitle(""); setdescription(""); setmedia([]); setunlockdate("")}}
            className="w-full border border-(--dark-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}