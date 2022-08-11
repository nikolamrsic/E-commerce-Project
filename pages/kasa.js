import React, { useEffect, useState } from "react";
import { useCorpa } from "../components/Context/Korpa";
import Article from "../components/Article";
import { Fragment } from "react";
import KorpaArtikal from "../components/KorpaArtikal";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { urlFor } from "../sanity";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
const IconArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
};

const RemoveIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 "
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
  );
};

export default function kasa() {
  let korpa = useCorpa();
  let ruter = useRouter();
  let [artikli, setAtikli] = useState([]);
 let {data:session}=useSession()
  useEffect(() => {
    setAtikli(korpa.state.uKorpi);
  });

  return (
    <>
      {korpa.state.uKorpi == 0 && (
        <section className="md:w-8/12  md:mx-auto mt-12 flex flex-col gap-5 h-fit  items-center justify-start">
          <h1 className="text-3xl text-black/40">Vasa korpa je prazna</h1>
          <h1 className="text-md text-black/40">Pogledajte neke od artiakla</h1>
          <Link href="/">
            <button
              type="button"
              className="active:bg-orange-800 active:text-white gap-3  hover:text-black hover:bg-neutral-50 hover:border-orange-500  border border-orange-500 py-2 text-white rounded px-6 text-center  text-black flex justify-between "
            >
              Nazad na artikle <IconArrow />
            </button>
          </Link>
        </section>
      )}
      {korpa.state.uKorpi != 0 && (

        
        <section className=" md:w-8/12 md:mx-auto mt-12 py-3 px-2   ">
          { session && <div className="border-b pb-3">
            <h1 className="text-2xl text-black/40 mb-4">Podaci o kupcu:</h1>
           <div className="flex flex-col gap-4">
           <h1 className="text-xl text-black/40">Ime: <span>{session.user.name}</span></h1>
            <h1 className="text-xl text-black/40">Email: <span>{session.user.email}</span></h1>
            <h1 className="text-xl text-black/40">Telefon: <span>067-123-123</span></h1>
           </div>
            
          </div>
        
          }
          <div className="mt-8">
            <h1 className="text-2xl text-black/40">Artikli u korpi :</h1>
            <div className="flex flex-col gap-15 ">
              {korpa.state.uKorpi.map((artikal, index) => {
                return (
                  <>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ x: 9999 }}
                        key={index}
                        className="w-full flex  py-2 px-4 hover:bg-stone-500/30  items-center justify-between"
                      >
                        <KorpaArtikal
                          title={artikal.title}
                          img={urlFor(artikal.img).url()}
                          count={artikal.count}
                          plus={() => {
                            korpa.dodaj_Jos_Jedan_Artiakl(artikal);
                          }}
                          minus={() => {
                            korpa.izbaci_Jedan_Artikal_(artikal);
                          }}
                        />
                        <button
                          onClick={() => {
                            console.log(korpa);
                            korpa.izbrisi_Artikal(artikal);
                          }}
                          type="button"
                          className="active:bg-orange-800 bg-white gap-5 flex active:text-white w-fit hover:text-white  hover:bg-red-500  border border-orange-500 py-2 text-white rounded px-6 text-center  text-black flex justify-between "
                        >
                          <span className="hidden lg:block">Ukloni</span> <RemoveIcon />
                        </button>
                      </motion.div>
                    </AnimatePresence>
                    <hr />
                  </>
                );
              })}

             <hr className=" mt-5 border-2 border-black/50 border-dashed"></hr>
              <div className="w-full flex flex-col md:flex-row items-center gap-5 justify-between mt-5">
                <span className="text-xl font-bold ">
                  Ukupno: {korpa.state.ukupno}
                </span>

                <button
                  type="button"
                  className="active:bg-orange-800  transition-all active:text-white  hover:text-black hover:bg-neutral-50 hover:border-orange-500  border border-orange-500 py-2 text-white rounded px-6 text-center  text-black flex justify-between "
                >
                  Zavrsi sa kupovinom <IconArrow />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
