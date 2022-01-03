import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar/Sidebar';
import Feed from '../components/feed/Feed';
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

