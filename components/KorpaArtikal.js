import React from "react";

export default function KorpaArtikal({
  title,
  img,
  price,
  count,
  plus,
  minus,
  total,
}) {
  return (
    <article className="flex max-w-[400px]  max-h-[120px] min-h-[120px] hover:bg-gray-400/5  p-3 gap-3 overflow-hidden">
      <img
        className=" w-6/12  w-full object-cover rounded"
        src={img}
        alt="Slika proizvoda"
      ></img>
      <div className=" w-6/12 flex flex-col gap-2 items-start text-right">
        <h1 className="   truncate">{title}</h1>
        <h1>{price}</h1>
        <div className="flex w-full justify-around">
          <span>{count}</span>
          <button
            onClick={plus}
            className=" border border-transparent active:border-orange-900 h-8 w-8 bg-orange-500 hover:bg-orange-900 active:bg-white active:text-black transition-all text-white rounded-full"
          >
            +
          </button>
          <button
            onClick={minus}
            className=" border border-transparent active:border-orange-900 h-8 w-8 bg-orange-500 hover:bg-orange-900 active:bg-white active:text-black transition-all text-white rounded-full"
          >
            -
          </button>
        </div>
      </div>
    </article>
  );
}
