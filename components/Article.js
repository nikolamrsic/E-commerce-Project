import React from 'react'

export default function Article({title,imgLink,price}) {
  return (
    <article className="flex flex-col  min-h-[350px] px-1 gap-3 overflow-hidden">
           <img   className=" w-6/12 object-cover"  src={imgLink}/>
           <div className="w-6/12 flex flex-col gap-2 items-start text-right">
             <h1 className="text-xl">{title}</h1>
             <h1 className='text-md text-red-500'>Cena: {price}</h1>
              <div class="flex w-full justify-around">
                <button className='py-2 px-3 w-full hover:bg-blue-600 bg-blue-800'>Add to Chart</button>
             
              </div>
           </div>
         </article>
  )
}
