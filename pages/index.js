import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar/Sidebar';
import Feed from '../components/feed/Feed';
import { getProviders } from 'next-auth/react';


import {getSession, getProviders,useSession} from 'next-auth/react';


export default function Home() {

  return(
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico"/>        
      </Head>

      <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar/>
        <Feed/>
      </main>
    </div>
  );
 
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res)=> res.json()
  );

  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );


  const providers = await getProviders(); //
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    }
  }

}