import React, { useEffect } from "react";
import { useID } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { memo } from "react";
function Icon() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 stroke-orange-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </motion.svg>
  );
}

function Filter() {
  let router = useRouter();
  let [min, setMin] = React.useState("");
  let [max, setMax] = React.useState("");

  let [Kategorije, setKategorije] = React.useState([
    { title: "ADIDAS", isChecked: false },
    { title: "NIKE", isChecked: false },
    { title: "CONVERSE", isChecked: false },
  ]);

  useEffect(() => {



    let query = router.query;
    if (Object.keys(query).length!==0) {
      query.model.split(" ").map((model) => {
        setKategorije((prev) => {
          return prev.map((kat) => {
            if (kat.title === model) {
              kat.isChecked = true;
            }
            return kat;
          });
        });
      });
    }
    if(Object.keys(query).length===0){
      setKategorije((prev)=>{
        return prev.map((item)=>{
          item.isChecked=false
          return item
        })
      })
    }
   
  }, [router]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        let filterKategorije = Kategorije.reduce((total, current) => {
          if (current.isChecked) {
            total = total + `+${current.title}`;
          }
          return total;
        }, "").slice(1);
        router.push(
          `pretraga/?model=${filterKategorije}&minCena=${min}&maxCena=${max}`
        );
        console.log(min, max);
      }}
      className="w-full py-2 px-4    top-0 max-w-[450px]  flex-col gap-9 "
    >
      {useID}
      <div className="w-full flex flex-col gap-5 items-center">
        <h1 className="text-xl   font-medium text-black/40">Brend</h1>

        <div className=" w-full flex justify-center items-center p-2">
          <ul className="w-6/12 flex flex-col gap-8 items-center  ">
            {Kategorije.map((item, index) => {
              return (
                <li key={index} className="w-full">
                  <label
                    htmlFor={useID}
                    className="w-full text-black/70 items-center select-none p-1  flex flex-row-reverse justify-between"
                  >
                    <div className="w-5  h-5 border-b border-b-orange-500 flex items-center justify-center ">
                      {item.isChecked && <Icon />}
                    </div>
                    <input
                      type="checkbox"
                      value={item.title}
                      onChange={(e) => {
                        setKategorije((prev) => {
                          return prev.map((cat) => {
                            if (cat.title === e.target.value) {
                              cat.isChecked = !cat.isChecked;
                            }
                            return cat;
                          });
                        });
                      }}
                      id={useID}
                      className="hidden"
                    />
                    {item.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full mt-8  p-2">
        <h1 className="text-xl text-center font-normal mb-5 text-black/40">
          Cena
        </h1>
        
        <div className="flex = justify-between ">
          <input
            className="border-b border-b-orange-500 w-5/12 text-center focus:outline-none focus:border-orange-500"
            type={"text"}
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min"
            pattern="[0-9]+"
          />
          <input
            className="border-b border-b-orange-500 w-5/12 text-center focus:outline-none focus:border-orange-500"
            type={"text"}
            value={max}
            pattern="[0-9]+"
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max"
          />
        </div>
      </div>
      <button
        type="submit"
        className="active:bg-orange-800   active:text-white mt-8 w-full hover:text-black hover:bg-neutral-50 hover:border-orange-500  border border-transparent py-2 text-white rounded px-6 text-center bg-orange-500"
      >
        Primeni
      </button>
    </form>
  );
}
const SideBarFilter = memo(Filter);
export default SideBarFilter;
