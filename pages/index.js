import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar/Sidebar';
import Feed from '../components/feed/Feed';

import Welcome from '../components/welcome/Welcome'

import { getSession, getProviders, useSession } from 'next-auth/react';
import Login from '../components/Login/Login';
import Modal from '../components/modal/Modal'
import { updatePostState,modalState } from '../atoms/modalAtom';
import {useRecoilState} from 'recoil';
import UpdatePost from '../components/post/UpdatePost';
import Widgets from '../components/widget/Widgets';
export default function Home({ trendingResults, followResults, providers }) {

  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const [isUpdatePostOpen,setIsUpdatePostOpen] = useRecoilState(updatePostState)
  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets trendingResults={trendingResults} followResults = {followResults}/>

        {isOpen && <Modal />}
        {isUpdatePostOpen && <UpdatePost/>}

      </main>
    </div>
  );

}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
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
