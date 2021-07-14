import styles from '../styles/Home.module.css'
import Image from 'next/image'
import focus from '../constants/fpcus.png'
import home_image from '../constants/homepage.png'
import { getSession, signIn, signOut } from "next-auth/client";
import notpad from '../constants/notpad.png'
import Notes from './notes'

export default function Home({session}) {


  return (
    <>
    <div className=" p-4 flex justify-between items-center">
      <div className=" flex items-center">
        <Image src={notpad} alt="logo" width="100px" height="100px" className="mr-2 hover:shadow-md "/>
        <a href="/" className="inline-block p-5 font-bold text-base hover:shadow-sm">Home</a>
        <a href="/new" className="inline-block p-5 font-bold hover:shadow-sm text-base"> Make Notes</a>
      </div>
        {
          session ? <div>
          <a href="/api/auth/signout" className="inline-block p-5 py-2 m-2 font-bold rounded hover:bg-indigo-500 bg-indigo-400 transition ease-in duration-150"><button className="btn" onClick={(e) => {
                signOut();
              }}>LogOut</button></a>
        </div> 
        :
        <div>
        <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=ceb8112733ea23a1715891cddaa0c87d1ab1e543b3e746bb4abc24f3ee9cf6a8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&client_id=288612998091-5me2sb33qnkkrkm4cmptdck5g7d9veur.apps.googleusercontent.com&flowName=GeneralOAuthFlow " className="inline-block p-5 py-2 m-2 font-bold rounded hover:bg-indigo-500 bg-indigo-400 transition ease-in duration-150"><button className="btn">LogIn</button></a>
      </div>
        }
      
    </div>
      <div className="flex justify-between items-center py-10 px-10 font-bold text-lg m-10">
      <div className="w-1/2 justify-center align-center flex flex-col p-5">
          <h1 className="text-3xl"> Welcome to yourNotes</h1>
          <br/>

          <p>Having fun while learning is the most important thing and lets have one while making notes. ❤</p>
          <div className='flex flex-row justify-center item-center m-5'>
          <a href="/new"  className="m-2 pd-3 underline"><Image src={focus} height="30px" width="30px" className="my-2"/>Get Started</a>

          {
            session ? <a href='/notes'className="m-4 pd-3 underline"> Your notes </a>: <div></div>
          }
          </div>
      </div>

       <div className="w-1/2 justify-center item-center flex">
          <Image src={home_image} alt="home-page-image" width="300px" height="300px" className="w-full"></Image>
       </div>
    </div>
    }
    
    </>
  )
}


export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};
