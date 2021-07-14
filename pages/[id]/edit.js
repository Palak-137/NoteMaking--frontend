import Link from 'next/link'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import Router,{ useRouter } from 'next/router'
import { getSession, signIn, signOut } from "next-auth/client";


function edit({session,note}) {
    const [form, setForm] = useState({ title: note.title, note: note.note})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isRes, setRes] = useState(false);
   
    const router = useRouter()

    useEffect(()=>{
        if(isSubmitting==true){
            updateNote();
        }
        if(isRes==true){
            router.push('/notes', undefined, { shallow: false })
        }
    })


    const updateNote =  () => {
         fetch(`http://localhost:1337/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.jwt}`,
                },
                body: JSON.stringify(form)
            }).then(
               setRes(true)
            )
        } 
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <button className="bg-blue-100 m-10 p-4 rounded shadow-lg"><a href="/notes">Back</a></button>
            <div className='w-full h-full flex item-center justify-center'>
              
                    {   <div className='w-3/5 m-10 p-10 m-20 h-2/4 rounded shadow-lg '>
                            <form onSubmit={handleSubmit}>
                            <h1 className='p-5 text-3xl font-bold'>New Note</h1>
                            <input fluid label='Title' placeholder='Title' name='title' onChange={handleChange} className='p-2 w-full text-md mt-5  outline-none' value={form.title}></input>
                            
                            <div className='flex justify-between'>
                            <textarea className=' p-2 whitespace-pre w-full h-full m-4 bg-pink-100 outline-none'
                            fluid label='Note'rows='10' placeholder='Note' name='note' onChange={handleChange} value={form.note}>
                            </textarea>

                            </div>
                           
                            <button className="bg-blue-500 m-3 p-3 rounded shadow-lg" type="submit">Update</button>
                        </form>
                        </div>
                    }
                </div>
        </div>
    )
}



export const getServerSideProps = async ({ query: { id } , req}) => {
    const session = await getSession({ req });

    const res = await fetch(`http://localhost:1337/notes/${id}`,{
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.jwt}`
        },
    })
    const data = await res.json();
    console.log(data)
    return {
      props: {
          session:session,
        note: data
      },
    };
  };



export default edit
