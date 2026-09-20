import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lockicon from "../assets/lock-icon.png";
import { apiFetch } from "../services/api";
export interface MemoryResponse {
  id: number;
  egg_id: number;
  title: string;
  content: string;
}
export interface EggResponse {
  id: number;
  title: string;
  user_id: number;
  open_date: string;
  is_sealed: boolean;
}
interface UserResponse {
  id: number;
  name: string | null;
  username: string;
  email: string;
}
export function EggDetails() {
  const { id } = useParams<{ id: string }>();

  const [egg, setEgg] = useState<EggResponse | null>(null);
  const [memory, setMemory] = useState<MemoryResponse | null>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    async function fetchEggMetadata() {
      if (!id) {
        setError("Egg not found.");
        setPageLoading(false);
        return;
      }

      try {
        setPageLoading(true);
        setError("");

        const user: UserResponse = await apiFetch("/api/users/me");
        const allEggs: EggResponse[] = await apiFetch(`/api/eggs/user/${user.id}`);
        const currentEgg = allEggs.find((eggItem) => eggItem.id === Number(id));

        if (!currentEgg) {
          setError("Egg not found.");
          setEgg(null);
          return;
        }

        setEgg(currentEgg);
      } catch (e) {
        console.error("Failed to fetch egg metadata:", e);

        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to load this egg.");
        }
      } finally {
        setPageLoading(false);
      }
    }

    fetchEggMetadata();
  }, [id]);
  useEffect(() => {
    if (!egg) return;
    const targetDate = new Date(egg.open_date).getTime();
    function updateTimer() {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        setTimeLeft(null);
        return;
      }
      setIsUnlocked(false);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }
    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [egg]);

  useEffect(() => {
    async function fetchMemory() {
      if (!isUnlocked || !id) {
        return;
      }

      try {
        setError("");

        const data: MemoryResponse[] = await apiFetch(`/api/eggs/${id}/memories`);

        if (data.length > 0) {
          setMemory(data[0]);
        } else {
          setMemory(null);
        }
      } catch (e) {
        console.error("Failed to fetch memory:", e);

        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Egg is locked or unavailable.");
        }
      }
    }

    fetchMemory();
  }, [id, isUnlocked]);

  if (pageLoading) {
    return (
      <main className="min-h-screen font-poppins flex justify-center items-center gap-3">
        <p className="text-[20px] text-(--dark-brown)">Loading Time Capsule...</p>

        <svg className="w-8 h-8 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path
            fill="#5c4a42"
            d="M286.7 96.1C291.7 113 282.1 130.9 265.2 135.9C185.9 159.5 128.1 233 128.1 320C128.1 426 214.1 512 320.1 512C426.1 512 512.1 426 512.1 320C512.1 233.1 454.3 159.6 375 135.9C358.1 130.9 348.4 113 353.5 96.1C358.6 79.2 376.4 69.5 393.3 74.6C498.9 106.1 576 204 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 204 141.1 106.1 246.9 74.6C263.8 69.6 281.7 79.2 286.7 96.1z"
          />
        </svg>
      </main>
    );
  }

  if (!egg) {
    return (
      <main className="min-h-screen font-poppins flex justify-center items-center px-6">
        <div className="text-center">
          <h1 className="text-[30px] font-bold text-(--dark-brown)">Egg not found</h1>

          {error && <p className="mt-3 text-(--light-brown)">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-poppins px-6 py-12 max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h1 className="text-[36px] font-bold text-(--dark-brown) mb-2">{egg.title}</h1>
      </div>

      {!isUnlocked ? (
        <div className="w-full border border-(--light-brown) bg-white/50 p-10 rounded-2xl flex flex-col justify-center items-center shadow-sm">
          <img src={lockicon} className="h-16 mb-4" alt="Locked" />

          <h2 className="text-[22px] font-medium text-(--dark-brown) mb-2 text-center">This Egg is locked!</h2>

          <p className="text-(--light-brown) mb-8 text-center">This memory will automatically unlock when the timer expires.</p>

          {timeLeft && (
            <div className="flex gap-4 sm:gap-6 justify-center w-full">
              <CountdownBox value={timeLeft.days} label="Days" />
              <span className="text-[28px] font-bold text-(--dark-brown) self-start mt-2">:</span>
              <CountdownBox value={timeLeft.hours} label="Hours" />
              <span className="text-[28px] font-bold text-(--dark-brown) self-start mt-2">:</span>
              <CountdownBox value={timeLeft.minutes} label="Minutes" />
              <span className="text-[28px] font-bold text-(--dark-brown) self-start mt-2">:</span>
              <CountdownBox value={timeLeft.seconds} label="Seconds" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          {error && <div className="mb-6 p-4 bg-red-100 text-red-600 rounded-lg w-full text-center">{error}</div>}
          {memory ? (
            <div className="w-full p-8 bg-white rounded-2xl border border-(--light-brown)/30 shadow-md">
              <h2 className="text-[24px] font-semibold text-(--dark-brown) mb-4 border-b border-(--light-brown)/20 pb-3">{memory.title}</h2>

              <p className="text-[17px] text-(--light-brown) leading-relaxed whitespace-pre-wrap">{memory.content}</p>
            </div>
          ) : (
            !error && <p className="text-(--light-brown)">No memory content found in this egg.</p>
          )}
        </div>
      )}
    </main>
  );
}
function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-(--bg-color) border border-(--dark-brown) rounded-xl flex items-center justify-center shadow-sm">
        <span className="text-[24px] sm:text-[28px] font-bold text-(--dark-brown)">{value.toString().padStart(2, "0")}</span>
      </div>
      <span className="text-[12px] sm:text-[14px] font-medium text-(--light-brown) mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}
