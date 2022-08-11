import React, { useEffect, useState } from "react";
import { sanityClient } from "../../sanity";
import { urlFor } from "../../sanity";
import { useCorpa } from "../../components/Context/Korpa";
export async function getServerSideProps(context) {
 
  const { query } = context;
  console.log('RUSIJA')
  console.log(query);

  let query_Sanity = `*[_type == 'patike' &&  model=='${query.model.split('-').join(' ')}' ]{
    
      mark,price,description,images,model}`;

  let data = await sanityClient.fetch(query_Sanity);

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}













export default function Patika({data}) {
  
  let korpa = useCorpa();
  let [artikal,setArtikal]=useState()

  let[mainUrl,setMainUrl]=useState('')
  
  useEffect(()=>{
    if(data[0].images.length!=0){

      setMainUrl(urlFor(data[0].images[0]).url())
    }
  
  },[])

  return (
    <section className="flex flex-col gap-5 relative md:flex-row h-fit justify-center w-full p-4   md:w-11/12    mx-auto ">
      <div className="  h-fit    md:w-7/12">
        <img
          className="h-full w-full object-cover"
          src={mainUrl}
        />
        <div className="flex border  w-full gap-3 mt-3 p-3">
         { data[0].images.length !=0 && 
           data[0].images.map((item,index)=>{
             return(
              <img
              key={index}
              onClick={()=>{
               setMainUrl(urlFor(item).url())
              }}
              className="w-[90px] h-[90px] md:w-[120px] md:h-[120px]  object-cover"
              src={urlFor(item).url()} alt={'Slika'+(index+1)}
            />
             )
           })
         }
      
        </div>
      </div>
      <div className="md:w-5/12  ">
        <div className="flex flex-col gap-3 p-4">
          <h1 className="text-4xl text-black/40">{data[0].mark}</h1>
          <h1 className="text-2xl  text-black/40 font-medium">{data[0].model}</h1>
          <p className="text-black/50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            temporibus labore aliquam mollitia numquam minus alias cumque vel
            esse, architecto, culpa accusamus fugiat dolorum unde? Ut quaerat
            error aliquam impedit.
      
          </p>
          <div className="text-2xl mt-5">
            Cena: <span>{data[0].price} RSD </span>
          </div>
          <div className="mt-5">
            <button 
             onClick={() => {
              korpa.dodaj_Artikal_U_Korpu(data[0]);
            }}
            className=" py-2 px-8 active:bg-orange-800 bg-orange-500  transition-all  active:text-white hover:border-orange-500 rounded border border-transparent text-white">Dodaj</button>
          </div>
        </div>
      </div>
    </section>
  );
}
