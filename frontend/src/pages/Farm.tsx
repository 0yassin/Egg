import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEggCard from "../components/CreateEggCard";
import Eggcard from "../components/Eggcard";
import type { EggCardProps } from "../components/Eggcard";
import CreateEggPopup from "../components/CreateEggPopup";
import { apiFetch } from "../services/api";

interface UserResponse {
  id: number;
  name: string | null;
  username: string;
  email: string;
}

interface EggResponse {
  id: number;
  title: string;
  user_id: number;
  open_date: string;
  is_sealed: boolean;
}

export function Farm() {
  const [eggs, setEggs] = useState<EggResponse[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalUnlockDate, setModalUnlockDate] = useState("");
  const [modalMemory, setModalMemory] = useState("");

  const [error, seterror] = useState("");
  const [modalisLoading, setmodalIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const navigate = useNavigate();


    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }
    }, []);


  async function fetchEggs() {
    try {
      setPageLoading(true);
      seterror("");

      const user: UserResponse = await apiFetch("/api/users/me");

      const userEggs: EggResponse[] = await apiFetch(`/api/eggs/user/${user.id}`);

      setEggs(userEggs);
    } catch (e) {
      console.error("Failed to fetch eggs:", e);
      seterror("Failed to load your eggs.");
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    fetchEggs();
  }, []);

  function getUnlockText(openDate: string) {
    const difference = new Date(openDate).getTime() - Date.now();

    if (difference <= 0) {
      return "unlocked";
    }

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days === 1) {
      return "unlocks in 1 day";
    }

    if (days < 30) {
      return `unlocks in ${days} days`;
    }

    const months = Math.ceil(days / 30);

    if (months === 1) {
      return "unlocks in 1 month";
    }

    if (months < 12) {
      return `unlocks in ${months} months`;
    }
    const years = Math.ceil(months / 12);
    if (years === 1) {
      return "unlocks in 1 year";
    }

    return `unlocks in ${years} years`;
  }
  function getDescription(egg: EggResponse) {
    if (egg.is_sealed) {
      return "A memory waiting to be harvested.";
    }

    return "Your time capsule.";
  }
  async function onmodalsubmit() {
    if (!modalTitle.trim() || !modalDescription.trim() || !modalUnlockDate.trim()) {
      seterror("Please fill all the detail fields");
      return;
    }

    if (modalTitle.trim().length < 3) {
      seterror("Title must have at least 3 characters");
      return;
    }

    if (!modalMemory.trim()) {
      seterror("Please add a memory");
      return;
    }
    try {
      seterror("");
      setmodalIsLoading(true);
      const localDate = new Date(`${modalUnlockDate}T00:00:00`);
      const user: UserResponse = await apiFetch("/api/users/me");
      const newEgg: EggResponse = await apiFetch("/api/eggs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: modalTitle.trim(),
          user_id: user.id,
          open_date: localDate.toISOString(),
        }),
      });

      await apiFetch(`/api/eggs/${newEgg.id}/memories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: modalTitle.trim(),
          content: modalMemory.trim(),
        }),
      });

      setModalTitle("");
      setModalDescription("");
      setModalUnlockDate("");
      setModalMemory("");
      setModalVisible(false);
      await fetchEggs();
    } catch (e) {
      console.error("Error creating egg:", e);

      if (e instanceof Error) {
        seterror(e.message);
      } else {
        seterror("Something went wrong while creating the egg.");
      }
    } finally {
      setmodalIsLoading(false);
    }
  }
  const cardsData: EggCardProps[] = eggs.map((egg) => ({
    title: egg.title,
    description: getDescription(egg),
    unlockDate: getUnlockText(egg.open_date),
    isLocked: new Date(egg.open_date).getTime() > Date.now(),
  }));
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
        {pageLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-[20px] text-(--dark-brown)">Loading your eggs...</p>
          </div>
        ) : (
          <>
            {error && !modalVisible && <div className="mb-6 w-full p-3 bg-red-100 text-red-600 border border-red-300 rounded-lg text-[15px]">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eggs.map((egg, index) => {
                const card = cardsData[index];
                return (
                  <Eggcard
                    key={egg.id}
                    unlockDate={card.unlockDate}
                    title={card.title}
                    description={card.description}
                    isLocked={card.isLocked}
                    onClick={() => {
                        navigate(`/egg/${egg.id}`);
                    }}
                  />
                );
              })}
              <CreateEggCard
                onClick={() => {
                  seterror("");
                  setModalVisible(true);
                }}
              />
            </div>
          </>
        )}
      </main>
      {modalVisible && (
        <CreateEggPopup
          onSubmit={onmodalsubmit}
          modalvisible={modalVisible}
          title={modalTitle}
          description={modalDescription}
          unlockDate={modalUnlockDate}
          setmodalvisible={setModalVisible}
          settitle={setModalTitle}
          setdescription={setModalDescription}
          setunlockdate={setModalUnlockDate}
          error={error}
          seterror={seterror}
          isLoading={modalisLoading}
          setmemory={setModalMemory}
          memory={modalMemory}
        />
      )}
    </>
  );
}
