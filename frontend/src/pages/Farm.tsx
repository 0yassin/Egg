import { useState } from "react";
import CreateEggCard from "../components/CreateEggCard";
import Eggcard from "../components/Eggcard";
import type { EggCardProps } from "../components/Eggcard";
import CreateEggPopup from "../components/CreateEggPopup";

const cardsData: EggCardProps[] = [
  { title: "birthday", description: "my 15th birthday", unlockDate: "unlocks in 2 days", isLocked: true },
  { title: "Team building event", description: "pictures from event with new collegues", unlockDate: "unlocks in 2 years", isLocked: true },
  { title: "Project launch", description: "luanching our first project together", unlockDate: "unlocks in 5 months", isLocked: true },
  { title: "Graduation day", description: "the day I graduated highschool", unlockDate: "unlocks in 10 days", isLocked: true },
];

export function Farm() {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalUnlockDate, setModalUnlockDate] = useState("");
  const [modalMedia, setModalMedia] = useState<any[]>([]);

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <Eggcard
              key={card.title || index}
              unlockDate={card.unlockDate}
              title={card.title}
              description={card.description}
              isLocked={card.isLocked}
              onClick={() => {}}
            />
          ))}
          <CreateEggCard onClick={() => setModalVisible(true)} />
        </div>
      </main>

      {modalVisible && (
        <CreateEggPopup
          modalvisible={modalVisible}
          title={modalTitle}
          description={modalDescription}
          unlockDate={modalUnlockDate}
          media={modalMedia}
          setmodalvisible={setModalVisible}
          settitle={setModalTitle}
          setdescription={setModalDescription}
          setunlockdate={setModalUnlockDate}
          setmedia={setModalMedia}
        />
      )}
    </>
  );
}