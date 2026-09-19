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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalUnlockDate, setModalUnlockDate] = useState("");
  const [modalMedia, setModalMedia] = useState<any[]>([]);
  const [error, seterror] = useState("")
  const [modalisLoading, setmodalIsLoading] = useState(false)
    
  async function onmodalsubmit() {
    if (!modalTitle.trim() || !modalDescription.trim() || !modalUnlockDate.trim())
    {
      seterror("Please fill all the detail fields")
      return
    }
    if (modalMedia.length < 1){
      seterror("Please add at least 1 element to the media section")
      return
    }

    if (modalTitle.trim().length < 3){
      seterror("Title must have at least 3 characters")
      return
    }
    try {
      seterror("")
      setmodalIsLoading(true)
      const formData = new FormData();
      formData.append("title", modalTitle)
      formData.append("description", modalDescription)
      formData.append("unlockdate", modalUnlockDate)
      modalMedia.forEach((file)=>{
      formData.append("media", file)
    })
    
      // placeholder endpoint!
      const response = await fetch("/api/createegg", {
        method: "POST",
        body: formData,
      })

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (!response.ok) {
        throw new Error("Failed to create egg");
      }
      const result = await response.json();
      console.log("Egg created successfully:", result);
      setModalTitle("");
      setModalDescription("");
      setModalUnlockDate("");
      setModalMedia([]);
      setModalVisible(false);
    } catch (e) {
      console.error("error creating egg", e)
      seterror(e)
    } finally {
      setmodalIsLoading(false)

    }
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
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
          onSubmit={onmodalsubmit}
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
          error={error}    
          seterror={seterror}
          isLoading={modalisLoading}
        />
      )}
    </>
  );
}