import { useEffect, useState } from "react";
import editicon from "../assets/editicon.svg";
import { apiFetch } from "../services/api";
import spinnericon from "../assets/spinnericon.svg"

interface UserResponse {
  id: number;
  name: string | null;
  username: string;
  email: string;
}

type EditField = "name" | "username" | "email" | null;

export function Account() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [modalvisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState<EditField>(null);
  const [inputValue, setInputValue] = useState("");
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const data = await apiFetch("/api/users/me");
      setUser(data);
    } catch (err) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }

  function openEditModal(field: "name" | "username" | "email") {
    setEditingField(field);
    setInputValue(user?.[field] || "");
    setError("");
    setModalVisible(true);
  }

  async function submitUpdate() {
    if (!editingField) return;

    if (!inputValue || inputValue.trim() === "" || inputValue === user?.[editingField]) {
      setError("Please provide a new value");
      return;
    }

    try {
      setError("");
      setModalLoading(true)
      const updatedUser = await apiFetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [editingField]: inputValue.trim() }),
      });
      
      setUser(updatedUser);
      setModalVisible(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Failed to update ${editingField}`);
      }
    } finally {
      setModalLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <div className="pt-12 flex justify-center text-[20px] text-(--dark-brown) font-poppins min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <main className="pt-12 px-4 font-poppins flex justify-center min-h-screen">
        <div className="w-full h-fit max-w-md py-6 px-9 border border-(--light-brown) rounded-xl">
          {error && !modalvisible && (
            <div className="mb-4 w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">
              {error}
            </div>
          )}

          <div className="flex gap-6 content-center items-center mb-6">
            <div className="flex flex-col">
              <span className="text-[25px] text-(--dark-brown) font-medium leading-none">
                {user?.name || "Display name"}
              </span>
              <span className="text-[14px] text-(--light-brown) mt-1">
                @{user?.username}
              </span>
            </div>
            <img
              className="h-6 cursor-pointer hover:opacity-75 transition-opacity"
              src={editicon}
              onClick={(e) => {
                e.preventDefault();
                openEditModal("name");
              }}
              alt="Edit Name"
            />
          </div>

          <div className="gap-3 flex-col flex">
            <button
              onClick={() => openEditModal("username")}
              type="button"
              className="w-full text-[20px] bg-(--light-brown) text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
            >
              change username
            </button>
            
            <button
              onClick={() => openEditModal("email")}
              type="button"
              className="w-full text-[20px] bg-(--light-brown) text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
            >
              change email
            </button>
            
            <button
              onClick={() => logout()}
              type="button"
              className="w-full mt-4 text-[20px] border border-red-400 text-red-500 hover:bg-red-50 py-3 rounded-lg transition-all cursor-pointer active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      {modalvisible && editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-poppins">
          <div className="w-full max-w-md p-8 rounded-xl bg-(--bg-color) border border-(--dark-brown) shadow-xl flex flex-col gap-4">
            
            <h2 className="text-[25px] font-semibold text-(--dark-brown) capitalize">
              Change {editingField}
            </h2>
            
            {error && (
              <div className="w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">
                {error}
              </div>
            )}
            
            <input
              type={editingField === "email" ? "email" : "text"}
              placeholder={`Enter new ${editingField}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-[17.5px] px-4 py-3 text-(--dark-brown) bg-(--bg-color) rounded-lg border border-(--light-brown)/80 focus:border-(--dark-brown) transition-all outline-none"
            />
            
            <div className="flex justify-center items-center gap-3 w-full text-(--bg-color) mt-2">
              <button
                disabled={modalLoading}
                type="button"
                onClick={submitUpdate}
                className="w-full bg-(--accent-blue) py-3 rounded-lg transition-all cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {!modalLoading? (
                  "Save"
                ): (
                  <img src={spinnericon} className="h-7 mx-auto animate-spin" />
                )}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setModalVisible(false);
                  setError("");
                }}
                className="w-full border border-(--dark-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) py-3 rounded-lg transition-all cursor-pointer active:scale-95"
              >
                  Cancel
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}