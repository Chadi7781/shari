
import {SparklesIcon} from '@heroicons/react/outline'

import { onSnapshot,collection,query,orderBy} from 'firebase/firestore';
import Input from '../input/Input';
import {useState,useEffect} from 'react'
import {db} from '../../firebase';
import Post from'../post/Post';

function Feed() {

    const [posts, setPosts] = useState([]);


    useEffect(
        () => 
         onSnapshot(
            query(collection(db,"posts"),orderBy("timestamp","desc")),
            (snapshot) => {
                setPosts(snapshot.docs);
            }
         ),
         [db]
    );
        





    return (
        <div className="text-black flex-grow border-l
         border-r border-gray-300 max-w-2xl sm:ml-[73px] xl:ml-[370px] ">  
            <div className="text-gray-500 flex items-center justify
            sm:justify-between py-2 px-3 sticky top-0 z-50 bg-white
            border-b border-gray-300
            ">
                <h2 className="text-lg sm:text-xl font-bold ">Home</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center 
                justify-center xl:px-0 ml-auto
                ">
                    <SparklesIcon className="h-5 text-black" />
                </div>

            </div>
            
            <Input/>

            <div className="pb-72">
                {posts.map((post) => (
                    <Post key={post.id} id={post.id}
                            post={post.data()} 
                            
                            />
                ))}
            
            
            </div>


        </div>
    )
}

export default Feed
