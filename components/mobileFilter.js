import React from "react";
import SideBarFilter from "./SideBarFilter";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/router";
export default function MobileFilter() {
  let [isOpenSideBar, setSideBar] = React.useState(false);
  let router = useRouter();
  const toogleSideBar = () => {
    setSideBar(!isOpenSideBar);
  };

  const closeGlobal = (e) => {};

  let sideBar = useRef();

 React.useEffect(()=>{
 setSideBar(false)
 },[router])

  return (
    <div className=" lg:hidden flex  justify-start px-3 py-5">
      <button
        onClick={toogleSideBar}
        className="flex gap-5 bg-black text-white py-1 px-4 rounded-full"
      >
        Filteri
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 pointer-events-none w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>
      {isOpenSideBar && (
        <AnimatePresence>
          <motion.div
            ref={sideBar}
            transition={{
             
              x: { duration: 0.5 },
              default: { ease: "linear" }
            }}
            initial={{ x: 9999 ,scaleX:0}}
            exit={{x:9999}}
            animate={{ x: 0 ,scaleX:1}}
            className="w-10/12 drop-shadow-lg max-w-[350px]  pt-[55px] h-screen bg-white/80 border-l border-orange-500 backdrop-blur-xl fixed top-0 z-50 right-0"
          >
            <button
              onClick={toogleSideBar}
              className="absolute  p-3  top-4 right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <SideBarFilter />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
