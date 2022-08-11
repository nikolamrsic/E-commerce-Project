import React, { useEffect, useRef, useState } from "react";
import Article from "./Article";
import Link from "next/link";
import { useCorpa } from "./Context/Korpa";
import KorpaArtikal from "./KorpaArtikal";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { urlFor } from "../sanity";

import { signOut, useSession, signIn } from "next-auth/react";

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 pointer-events-none "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
};

const IconArrow = () => {
  return (
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
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
};

export default function Navbar() {
  const { data: session } = useSession();

  let korpa = useCorpa();

  let [isOpen, setOpen] = React.useState(false);

  let [artikli, setArtikli] = useState([]);

  let [ukupno, setUkupno] = useState(0);

  let [ukupnoArtikala, setUkupnoArtikala] = useState(0);

  let [isOpenLoginMenu, setLoginMenuOpen] = useState(false);

  const loginMenuContent = React.useRef();
  const loginMenuBtn = React.useRef();

  const cartBtn = React.useRef();
  const artikliRef = React.useRef();
  const openLoginMenu = () => {
    setLoginMenuOpen(!isOpenLoginMenu);
    setOpen(false)
  };

  const openCart = () => setOpen(!isOpen);

  const closeGlobalLoginMenu = (e) => {
    if (
      e.target !== loginMenuBtn.current &&
      e.target !== loginMenuContent.current
    ) {
      setLoginMenuOpen(false);
    }
  };

  useEffect(() => {
    setArtikli(korpa.state.uKorpi);
    setUkupno(korpa.state.ukupno);
    setUkupnoArtikala(korpa.state.ukupnoArtikala);
  });

  useEffect(() => {
    window.addEventListener("click", closeGlobalLoginMenu);

    return () => {
      window.removeEventListener("click", closeGlobalLoginMenu);
    };
  });

  return (
    <motion.nav className="w-full fixed   top-0   border-b z-50  drop-shadow-sm bg-gradient-to-r to-oragne-300/20 backdrop-blur-xl flex justify-between items-center  px-5 py-2 ">
      <div className=" flex gap-3  text-xl items-center">
        <div className="text-orange-500 font-bold">
          <span
            onClick={() => {
              console.log(session);
            }}
            className="py-2 px-5 text-white bg-orange-500"
          >
            TikePa
          </span>{" "}
          Shop
        </div>
        <ul className=" ml-16">
          <li>
            <Link href="/">
              <a className="text-xl  font-light rounded hover:underline py-2 px-4  hover:text-orange-500">
                Patike
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex  items-start gap-5  p-2">
        <div className="flex items-start gap-2">
          {artikli.length !== 0 && (
            <div className=" hidden md:flex flex-col  justify-center  w-full mt-5 px-3">
              <h1 className="text-black ">
                Ukupno: <span className="font-bold">{ukupno}</span>
              </h1>
            </div>
          )}

          <div className="relative flex    flex-row items-center gap-3   p-1 ">
            <span className=" w-[25px] flex items-center justify-center h-[25px] z-50  rounded-full absolute top-0 -right-2 text-white drop-shadow bg-orange-500">
              {ukupnoArtikala}
            </span>
            <motion.button
              ref={cartBtn}
              onClick={() => {
                openCart();
              }}
              className="w-12 h-12 border bg-white rounded-full flex items-center justify-center transition-all"
            >
              <Icon />
            </motion.button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute    z-[9999] bg-white overflow-x-hidden flex flex-col w-[350px] overflow-y-auto   items-center rounded  border max-h-[450px]  drop-shadow-xl   h-fit py-8 right-0 top-14  "
                >
                  {artikli.length != 0 ? (
                    <div className="flex items-center flex-col gap-3">
                      <div className="flex flex-col items-center gap-3 ">
                        <ul className="flex border flex-col  ">
                          {artikli.map((artikal, index) => {
                            return (
                              <li key={index} className="test">
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
                              </li>
                            );
                          })}
                        </ul>
                        <Link href="/kasa">
                          <button
                            type="button"
                            className="active:bg-orange-800 active:text-white w-6/12 hover:text-black hover:bg-neutral-50 hover:border-orange-500  border border-orange-500 py-2 text-white rounded px-6 text-center  text-black items-center flex justify-between "
                          >
                            Idi na kasu <IconArrow />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <h1>Korpa je prazna</h1>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {session ? (
          <div className=" relative">
            <div className=" max-w-[250px]">
              <button
                ref={loginMenuBtn}
                onClick={openLoginMenu}
                className="w-12 h-12 bg-red-500 overflow-hidden justify-center items-center flex text-2xl text-white rounded-full"
              >
                <img
                  className="w-full h-full object-cover pointer-events-none"
                  src={session.user.image}
                />
              </button>
              {isOpenLoginMenu && (
                <div
                  ref={loginMenuContent}
                  className="absolute   right-0 bg-white border mt-3 w-fit min-w-[250px] flex flex-col items-start px-3 gap-4 pt-4 "
                >
                  <ul className="flex flex-col gap-3  pointer-events-none ">
                    <li className="text-black/40">{session.user.name}</li>
                    <li className="text-black/40">{session.user.email}</li>
                  </ul>
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="py-1 px-6 border"
                  >
                    Odjavi se
                  </button>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <motion.button
            onClick={() => {
              signIn();
            }}
            title="Login"
            className=" self-center"
          >
            Login
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}
