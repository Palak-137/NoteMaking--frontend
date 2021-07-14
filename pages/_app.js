import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Layout from '../components/Layout';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 
import { getSession, signIn, signOut } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default MyApp
