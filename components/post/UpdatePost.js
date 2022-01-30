


import React from 'react';



import {Transition, Dialog} from '@headlessui/react';
import {updatePostState,postIdState} from '../../atoms/modalAtom'
import {useRecoilState} from 'recoil';
import {Fragment , useEffect, useState} from 'react'
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { addDoc,collection,serverTimestamp,onSnapshot ,doc} from 'firebase/firestore';
import {db} from "../../firebase"
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';
function UpdatePost() {




  const {data :session} = useSession();
  const [isUpdatePostOpen, setIsUpdatePostOpen] = useRecoilState(updatePostState);
  const [post, setPost] = useState(postIdState);
  const [comment, setComment]= useState("");
  
  const [text, setText]= useState("");

  const router = useRouter();
  const [postId, setPostId] = useRecoilState(postIdState);
  useEffect(
    () => 
    onSnapshot(doc(db, "posts", postId), (snapshot) =>{
      setPost(snapshot.data());
    }),[db]
  )



  
  const updatePost = async (e) => {
    e.preventDefault();
    await setDoc(doc(db,"posts",postId), {
      post:post,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp:serverTimestamp()
    });

    setIsUpdatePostOpen(false);
    setText("");

    router.push(`/${postId}`);
  }

  
  return (
    <Transition.Root show={isUpdatePostOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8"  onClose={setIsUpdatePostOpen}>
      <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 
      text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
             <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden 
             shadow-xl transform transition-all sm:my-8 
             sm:align-middle sm:max-w-xl sm:w-full">

                <div className="flex item-center px-1.5 py-2 border-b border-gray-100">
                  <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                    onClick={() => setIsUpdatePostOpen(false)}
                  >
                    <XIcon className="h-[22px] text-gray-700"/>

                  </div>

                  
                </div>

                <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                  <div className="w-full">
                   
                    <div className=" flex item-center space-x-3 w-full">
                      <div className="flex-grow mt-2">
                        <textarea
                          value={post?.text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Replay !!"
                          rows="2"
                          className="bg-transparent outline-none text-gray-900 text-lg placeholder-gray-500
                          tracking-wide w-full min-h-[80px]"/>

<div className="flex items-center justify-between pt-2.5">
                   
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                        //   onClick={sendComment}
                          disabled={!text.trim()}
                        >
                          Update
                        </button>
                      </div>

                      </div>
                    </div>

                  </div>
                </div>


                </div>
            </Transition.Child>
          </div>

      </Dialog>



    </Transition.Root>
  )

}
export default UpdatePost;




