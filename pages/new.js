import Link from 'next/link'
import { getSession, signIn, signOut } from "next-auth/client";
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'



const NewNote = ({session}) => {
    const [title,setTitle] = useState("")
    const [note,setNote] = useState("")
    const router = useRouter()


    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(title,note)
        fetch('http://localhost:1337/notes', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${session.jwt}`
        },
        body : JSON.stringify({
            title: title,
            note: note
        }),
        })
        .then((res) => {console.log('hui gawaaa')})
            router.push('/notes');
          };
   


    if(!session){
        useEffect(()=>{
            router.push('/')
        },[])
        return(
            <div>
                
            </div>
        )
    }
        return(
            <>
                <button className="bg-blue-100 m-10 p-4 rounded shadow-lg"><a href="/">Back</a></button>
            <div className='w-full h-full flex item-center justify-center'>
              
                    {   <div className='w-3/5 m-10 p-10 m-20 h-2/4 rounded shadow-lg '>
                            <form onSubmit={handleSubmit}>
                            <h1 className='p-5 text-3xl font-bold'>New Note</h1>
                            <input fluid label='Title' placeholder='Title' name='title' onChange={e=>setTitle(e.target.value)} className='w-full text-md mt-5  outline-none'></input>
                            
                            <div className='w-full m-2 p-4 mr-8 divide-y flex justify-end h-2/5'>
                            </div>
                            <div className='flex justify-between'>
                            <textarea className=' p-2 whitespace-pre w-full h-full m-4 bg-pink-100 outline-none'
                            fluid label='Note'rows='10' placeholder='Note' name='note' onChange={e=>setNote(e.target.value)}>
                            </textarea>

                            </div>
                           
                            <button className="bg-blue-500 m-2 p-3 rounded" type="submit">Create</button>
                        </form>
                        </div>
                    }
                </div>
                </>
        
            )}
    
    

    export const getServerSideProps = async ({ req }) => {
        const session = await getSession({ req });
        return {
          props: {
            session,
          },
        };
      };


export default NewNote