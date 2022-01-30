import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Feed from '../components/feed/Feed';
import Sidebar from '../components/sidebar/Sidebar';
import { useRecoilState } from 'recoil';

import { modalState, postIdState } from '../atoms/modalAtom';
import { getSession, getProviders, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { doc, onSnapshot, orderBy,query,collection } from 'firebase/firestore';
import Login from '../components/Login/Login'
import { db } from '../firebase';
import Modal from '../components/modal/Modal';
import Post from '../components/post/Post';
import Comment from '../components/comment/Comment';
import { ArrowLeftIcon } from '@heroicons/react/solid';

function PostPage( trendingResults, followResults, providers) {

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);


  // console.log(router.query.id);
  const { id } = router.query;

  useEffect(
    () => {
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }), [db]
    }
  )

  useEffect(() => {
    onSnapshot(query(
      collection(db,"posts",id,"comments"),orderBy("timestamp","desc")
    ),
    (snapshot) => {
      setComments(snapshot.docs)
    }
    ),
    [db,id]
  }
  );

  if (!session) {
    return <Login providers={providers} />
  }

  return (<div>
    <div className="">
      <Head>
        <title>{post?.username} on Shari: "{post?.text}"   </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-200
          max-w-2xl sm:ml-[73px] xl:ml-[370px]
        
        " >
          <div className="flex items-center px-1.5 py-2
          border-b border-r-gray-700 text[#d9d9d9] font-semibold text-xl
          gap-x-4 sticky top-0 z-50 bg-white">
            <div className="hoverAnimation w-9 h-9 flex items-center
            justify-center xl:px-0"
            onClick={() => router.push("/") }
            >
              <ArrowLeftIcon className="h-5 text-black"></ArrowLeftIcon>
            </div>
            Comments

          </div>
          <Post id={id} post={post} postPage/>

          {comments.length > 0  && (
            <div className="pb-72">
              {comments.map((comment) =>(
                <Comment key={comment.id} id={comment.id} comment={comment.data()}/>
              ))} 

            </div>
          )}
          

        </div>

        {isOpen && <Modal />}
      </main>
    </div>
  </div>);
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
      // trendingResults,
      // followResults,
      providers,
      session,
    }
  }

}


export default PostPage;
