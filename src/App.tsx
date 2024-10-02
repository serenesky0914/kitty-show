import { useState, useEffect } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arraySwap,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { CardData } from "./Interface/types";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { SortableItem } from "./components/SortableItem";

const App = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedItem, setSelectedItem] = useState<CardData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data: CardData[]) => setCards(data));
  }, []);

  const handleCardClick = (item: CardData) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id == over.id) return;

    const activeIndex = cards.findIndex((card) => card.position == active.id);
    const overIndex = cards.findIndex((card) => card.position == over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const updatedCards = arraySwap(cards, activeIndex, overIndex);
      console.log(updatedCards);
      setCards(
        updatedCards.map((card, index) => ({
          ...card,
          position: index.toString(),
        }))
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-6xl p-4">
          <SortableContext
            items={cards.map((card) => card.position)}
            strategy={rectSwappingStrategy}
          >
            <div className="grid grid-cols-3 gap-16">
              {cards.map((item) => (
                <SortableItem
                  key={item.position}
                  id={item.position}
                  onClick={() => handleCardClick(item)}
                >
                  <Card item={item} />
                </SortableItem>
              ))}
            </div>
          </SortableContext>
          {selectedItem && (
            <Modal item={selectedItem} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </DndContext>
  );
};

export default App;
