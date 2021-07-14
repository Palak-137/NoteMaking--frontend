import Link from 'next/Link'
import fetch from 'isomorphic-unfetch'
import Router, { useRouter } from 'next/router'
import { getSession, signIn, signOut } from "next-auth/client"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Notes({session,notes}) {

    const router = useRouter();

    const deleteNote=async (id)=>{
         
         fetch(`http://localhost:1337/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.jwt}`,
                },
                body: JSON.stringify({
                    id: id
                })
            })
            Router.push('/notes')

        }
       // console.log(notes);
        return (
            <div>
                <button className="bg-blue-100 m-10 p-4 rounded shadow-lg"><a href="/">Back</a></button>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-gray-900 text-4xl font-extrabold'> Your Notes</h1>
                    <a href="/new"><button className='m-5 p-3 bg-gray-200 font-xl font-bold rounded shadow-lg'><FontAwesomeIcon icon={faPlus} /> Create Note</button></a>
                </div>
                <div className='flex flex-row justify-center items-center'>
                <div className='h-full w-3/4 shadow-xl m-10 bg-gray-100 flex justify-center items-center rounded'>

                    {
                        notes.map(note=>{
                            return(
                            <div className="max-w-md w-1/3 py-4 m-4 px-8 bg-white shadow-xl border-light rounded-lg my-20">
                                <div class="flex justify-center md:justify-end -mt-9">
                                    <div class="w-10 h-10 object-cover rounded-full border-2 bg-indigo-500" />
                                </div>
                                <div>
                                    <h2 class="text-gray-800 m-5 text-3xl font-semibold">
                                    <Link href={`/${note._id}/edit`}>
                                        <a>{note.title}</a>
                                    </Link></h2>
                                </div>

                                <div className="w-full h-3/4 flex flex-row justify-between">
                                <div class="flex justify-end mt-4">
                                    <a href="#" class="text-xl font-medium text-indigo-100">
                                    <Link href={`/${note._id}/edit`}>
                                        <button primary className="bg-blue-500 rounded m-2 p-2 w-full">Edit</button>
                                    </Link>
                                    </a>
                                </div>
                                <div class="flex justify-end mt-4">
                                   
                                    <button primary onClick={e=>deleteNote(note._id)} className="text-xl font-medium text-blue-100 bg-red-500 rounded m-2 p-2 w-full">Delete</button>
                                       
                                </div>
                                </div>
                            </div>
                            )
                        })
                    }
                   </div>
                </div>
            </div>
        )
        
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    const res = await fetch("http://localhost:1337/notes",{
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
        session: session,
        notes: data
      },
    };
  };


export default Notes
