import Head from 'next/head'
import { getSession, signIn, signOut } from "next-auth/client";

const Layout = ({ children ,session}) => {
    //console.log(session);
    return(
    <>
        <Head>
            <title>Note App</title>
        </Head>
        <div>
        {children}
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

export default  Layout