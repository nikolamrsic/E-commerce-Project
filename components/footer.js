import React from 'react'

export default function Footer() {
  return (
    <div className='w-full  relative  p-4 h-fit h-min-[55px]  bg-black/60 mt-16 border-t-4  '>
     
        <div className='flex flex relative z-50  gap-16 px-4 py-2 items-baseline '>
           <div>
           <h1 className='text-2xl font-bold text-white ' >Ecommerce projekat</h1>
            <h1  className='text-xl font-thin text-white'>Napravio: <a className=' underline' rel="noreferrer" href='https://www.linkedin.com/in/nikola-mrsic-design/' target={'_blank'}>Nikola Mrsic</a></h1>
           </div>
            <ul>
            <li className='text-white font-bold text-xl'>Tehnologije:</li>
                <li className='text-white font-thin text-xl'>React</li>
                <li  className='text-white font-thin tex-xl'>Next. Js</li>
                <li className='text-white font-thin text-xl'>Tailwind</li>
                <li className='text-white font-thin text-xl'>Sanity</li>
            </ul>
        </div>
    </div>
  )
}
