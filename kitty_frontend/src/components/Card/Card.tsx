import React, { useState } from "react";
import { CardData } from "../../Interface/types";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  item: CardData;
  onClick?: (event: any) => void;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(function (
  params,
  ref
) {
  const { className, children, item, onClick, ...props } = params;
  const [loading, setLoading] = useState(true);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow cursor-pointer flex flex-col justify-between ${
        loading ? "h-72" : ""
      }`}
      style={{ width: "100%", height: "300px" }}
      {...props}
    >
      <h3 className="text-lg font-bold text-black text-center">{item.title}</h3>
      {loading && (
        <div className="flex justify-center items-center h-32 mb-2">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
        </div>
      )}
      <img
        src={item.gif_url}
        alt={item.type}
        className={`object-cover w-full h-60 transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );
});

export default Card;
