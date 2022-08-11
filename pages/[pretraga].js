import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import KorpaArtikal from "../components/KorpaArtikal";
import { sanityClient } from "./../sanity";
import Article from "../components/Article";
import { useCorpa } from "../components/Context/Korpa";
import React, { useEffect } from "react";
import { urlFor } from "../sanity";
import SideBarFilter from "../components/SideBarFilter";
import { motion } from "framer-motion";
import Link from "next/link";

export async function getServerSideProps(context) {
  console.clear;
  const { query } = context;
  console.log(query);

  let query_Sanity = `*[_type == 'patike' ${query.model!='' ? `&& mark in [${query.model
    .split(" ")
    .map((item) => {
      return `'${item}'`;
    })}
     ]` : ''}  ${query.minCena != "" ? `&& price>=${query.minCena}` : " "}   ${
    query.maxCena != "" ? `&& price<=${query.maxCena}` : " "
  } ]{
    
      mark,price,description,images,model}`;

  let data = await sanityClient.fetch(query_Sanity);

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default function Home({ data }) {
  let korpa = useCorpa();
  let [filter, setFilter] = React.useState(null);

  const upDeateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className=" bg-gradient-to-b w-full lg:w-10/12    relative to-white min-h-screen">
     
   
      
      
     
      <section className="flex  gap-5  w-full  py-3  relative    px-2 justify-start">
        {/**Render artikle */}
        <div className="w-full  justify-center lg:justify-start  flex flex-wrap gap-5">
          {data != undefined &&
            data.map((articl, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  whileInView={{ scale: 1 }}
                  key={index}
                  className="flex border overflow-hidden  border-transparent hover:border-orange-400   bg-white flex-col gap-3 pb-3 w-[340px]  drop-shadow  mt-15   transition-all"
                >
                  <img
                    className="w-full  transition-all hover:scale-105 object-cover min-h-[260px] max-h-[260px]"
                    src={urlFor(articl.images[0]).url()}
                  ></img>
                  <div className="flex flex-col gap-2 px-3 py-2">
                    <div className="flexvflex-col gap-3 justify-between">
                      <h1 className="py-1  rounded  w-fit ">{articl.mark}</h1>
                      <h1 className="text-ellipsis overflow-hidden truncate text-black/40">
                        {" "}
                        {articl.model}
                      </h1>
                    </div>
                    <h1 className="font-thin">
                      Cena:{" "}
                      <span className="font-bold">{articl.price} RSD</span>{" "}
                    </h1>
                    <div className="flex justify-between">
                    <Link
                        passHref
                        href={`/single/patika/?model=${articl.model
                          .split(" ")
                          .join("-")}`}
                      >
                        <motion.a className="flex items-center gap-3 underline-offset-8 hover:underline">
                          Pogledaj
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </motion.a>
                      </Link>

                    <motion.button
                      title='Dodaj u korpu'
                      onClick={() => {
                        korpa.dodaj_Artikal_U_Korpu(articl);
                      }}
                      className=" p-2 active:bg-orange-800 bg-orange-500  transition-all  active:text-white hover:border-orange-500 rounded border border-transparent text-white"
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          {data.length === 0 && (
            <div className="w-full  justify-center    flex flex-wrap gap-5">
              <h1 className="text-3xl text-black/40">
                Nema odgovarajucih rezultata{" "}
              </h1>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
