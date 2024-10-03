import React, { useEffect } from "react";

import { CardData } from "../../Interface/types";

export interface ModalProps {
  item: CardData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <img
          src={item.gif_url}
          alt={item.type}
          className="object-cover h-96"
          style={{ width: "600px" }}
        />
        <div className="flex justify-end">
          <button
            className="p-1 mt-4 bg-blue-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
