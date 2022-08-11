import React, { useEffect, useState } from "react";
import { createContext, useContext, useReducer } from "react";

let KorpaContext = createContext();

let initialState = {
  uKorpi: [],
  ukupno: 0,
  ukupnoArtikala: 0,
};

function reducer(state, action) {
  if( Array.isArray(state.uKorpi)){
  switch (action.type) {
    //dodaj novi artikla u korpu
    case "dodajArtikal":
      if (
        state.uKorpi.some((item) => item.title == action.payload.model) ===
        false
      ) {
        state.uKorpi=[...state.uKorpi,{
          title: action.payload.model,
          price: action.payload.price,
          img: action.payload.images[0],
          count: 1,
        }]
      
      } else {
        state.uKorpi.map((item) => {
          if (item.title === action.payload.title) {
            item.count++;
          }
        });
      }

      //postavi ukupnu cenu
      state.ukupno = state.uKorpi.reduce((total, current) => {
        total = total + current.price * current.count;
        return total;
      }, 0);

      //postavi ukuono artiklaa u korpbi

      state.ukupnoArtikala = state.uKorpi.reduce((total, current) => {
        total = total + current.count;
        return total;
      }, 0);

      return { ...state };
      break;

    ///povecaj kolicinu za jedan
    case "dodajJosJedanArtikal":
      state.uKorpi.map((item) => {
        if (item.title == action.payload.title) {
          item.count++;
        }
      });
      //postavi ukupnu cenu
      state.ukupno = state.uKorpi.reduce((total, current) => {
        total = total + current.price * current.count;
        return total;
      }, 0);

      //postavi ukuono artiklaa u korpbi

      state.ukupnoArtikala = state.uKorpi.reduce((total, current) => {
        total = total + current.count;
        return total;
      }, 0);

      return { ...state };

    //smanji za jedan arikal i uklni sa liste ako je 0

    case "izbaciJedanArtikal":
      state.uKorpi.map((item) => {
        if (item.title == action.payload.title) {
          item.count--;
        }
      });
      if (state.uKorpi.some((item) => item.count == 0)) {
        let tem = state.uKorpi.filter((item) => {
          return item.title !== action.payload.title;
        });
        state.uKorpi = tem;
      }
      //postavi ukupnu cenu
      state.ukupno = state.uKorpi.reduce((total, current) => {
        total = total + current.price * current.count;
        return total;
      }, 0);

      //postavi ukuono artiklaa u korpbi

      state.ukupnoArtikala = state.uKorpi.reduce((total, current) => {
        total = total + current.count;
        return total;
      }, 0);

      return { ...state };

    //izbaci artikal iz korpe
    case "izbrisiArtikal":
      let temp = state.uKorpi.filter(
        (item) => item.title != action.payload.title
      );
      state.uKorpi = temp;
      state.ukupno = state.uKorpi.reduce((total, current) => {
        total = total + current.price * current.count;
        return total;
      }, 0);

      //postavi ukuono artiklaa u korpbi

      state.ukupnoArtikala = state.uKorpi.reduce((total, current) => {
        total = total + current.count;
        return total;
      }, 0);

      return { ...state };
      break;
    default:
      throw new Error();
  }
}
}

const Icon = () => {
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
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
};

export default function KorpaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (state.uKorpi.length) {
        localStorage.setItem("korpa", JSON.stringify(state));
      }
    }
    return (()=>{
      if(state.uKorpi.length==0){
        localStorage.clear()
      }
    })
  }, [state]);


  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("korpa")) {
      let local = JSON.parse(localStorage.getItem("korpa"));
      state.uKorpi = local.uKorpi;
      state.ukupno = local.ukupno;
      state.ukupnoArtikala = local.ukupnoArtikala;
    }
  }, [state]);

  
  return (
    <KorpaContext.Provider
      value={{
        state: state,
        dodaj_Artikal_U_Korpu: (artikal) => {
          dispatch({ type: "dodajArtikal", payload: artikal });
        },
        dodaj_Jos_Jedan_Artiakl: (artikal) => {
          dispatch({ type: "dodajJosJedanArtikal", payload: artikal });
        },
        izbaci_Jedan_Artikal_: (artikal) => {
          dispatch({ type: "izbaciJedanArtikal", payload: artikal });
        },
        izbrisi_Artikal: (artikal) => {
          dispatch({ type: "izbrisiArtikal", payload: artikal });
        },
      }}
    >
      {children}
    </KorpaContext.Provider>
  );
}

export function useCorpa() {
  return useContext(KorpaContext);
}
