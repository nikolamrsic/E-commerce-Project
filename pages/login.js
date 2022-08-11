import React from 'react'
import { signOut, useSession, signIn,} from 'next-auth/react'


export default function Login() {
  const {data:session}=useSession( )
  console.log(session)
  if(session){
    return (
      <div className='w-full h-full'>
        <div>WELCOME {session.user.name}</div>
      </div>
    )
  }else{
    return (
      <div className='w-full h-full'>
        <button onClick={()=>signIn()}>login</button>
      </div>
    )
  }
}
