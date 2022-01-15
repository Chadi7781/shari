import { DotsHorizontalIcon ,TrashIcon} from "@heroicons/react/outline"
import { useSession} from 'next-auth/react';

import {
    addDoc,
    collection,
    doc,deleteDoc,
    serverTimestamp,
    updateDoc
} from '@firebase/firestore';

import {db,storage} from '../../firebase';
import { useRouter } from 'next/router'

function Post({id,post, postPage}) {
    const router = useRouter()


    const {data:session} = useSession();


    const deletePost = (e) => {
        
        e.stopPropagation();
        deleteDoc(doc(db,"posts",id));
        router.push("/");
    }


    return (
        
        <div className="p-3 flex cursor-pointer
        border-b border-gray-20 0">
            {!postPage && <img src={post?.userImg } alt=""
            
            className="h-11 w-11 rounded-full mr-4"
            />}

            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage &&(
                         <img src={post?.userImg } alt=""
            
                         className="h-11 w-11 rounded-full mr-4"
                         />

                    )}
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4 className={`font-bold text-[15px]
                                sm:text-base text-[#000] group-hover:underline
                                ${!postPage && "inline-block"}
                            
                            `}>
                                {post?.username}
                            </h4>
                            <span className={`text-sm sm:text-[15px]] ${!postPage && "ml-1.5"} `}>
                                @{post?.tag}
                            </span>
                            
                        </div>
                        {" "}.{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            {/* <Moment> */}
                            </span>

                            {!postPage && (
                                <p className="text-gray-900 text-[15px]
                                    sm:text-base mt-0.5">{post?.text}</p>
                                
                      
                            )}
                                          <img src={`${post?.image}`} alt=""
                            className="rounded-2xl max-h-[700px] object-cover mr-2"></img>       


                    </div>
                    <div className="icon group ml-auto">
                        <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]"/> 
                    </div>
                </div>

                {postPage && (
                    <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                        {post?.text}
                    </p>
                )}

                <img src={`${post?.image}`} alt=""className="rounded-2xl max-h-[700px] object-cover mr-2"/> 
                <div className={`text-[#6e767d] flex justify-between w-10/12`}>

                   {session.user.uid === post?.id ?(
                       <div className="flex items-center space-x-1 gorup"
                       onClick={(e)=>{deletePost(e)}}
                       
                       >
                           <div className="icon group-hover:bg-red-600/10">
                               <TrashIcon className="h-5 group-hover:text-red-600"/>
                           </div>

                       </div>
                   ):<div>session not ok</div>}
                       
                       
                    </div>

                
            </div>
            


            
        </div>
    )
}

export default Post
