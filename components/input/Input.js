import { XIcon ,PhotographIcon, EmojiHappyIcon, ChartBarIcon, CalendarIcon} from '@heroicons/react/outline';
import {useState,useRef} from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import {signOut, useSession} from 'next-auth/react';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc
} from '@firebase/firestore';

import {db,storage} from '../../firebase';
import { uploadString,ref ,getDownloadURL} from 'firebase/storage';
function Input() {


    //USE SESSION FROM NEXT AUTH 
   const {data: session} = useSession();


    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] =useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((e1) => codesArray.push("0x"+e1));
        let emoji = String.fromCodePoint(...codesArray);
        setInput( input + emoji);

    }


    const sendPost = async() => {
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db,"posts"), {
            id: session.user.uid,
            username: session.user.name,
            userImg:  session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp:   serverTimestamp(),

        });

        const imageRef = ref(storage,`posts/${docRef.id}/image`);

        if(selectedFile) {
            await uploadString(imageRef,selectedFile,"data_url").then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await  updateDoc(doc(db,"posts",docRef.id), {
                        image: downloadURL
                    });
                }
            )
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);


        
    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };

    }
    return (
        <div className={`border-b border-x-gray-300 p-3
                        flex space-x-3 overflow-y-scroll
                        ${loading && "opacity-60"}
    
        `}>
            
            <img src={session.user.image}
            
             alt=""
             className="h-11 w-11 rounded-full cursor-pointer"
             /> 





             <div className="w-full divide-y divide-gray-300">
                 <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                     <textarea
                       value={input}
                       onChange={(e)=> setInput(e.target.value)}
                       rows="2"
                     placeholder="Whats in your mind ?"
                     className="bg-transparent outline-none text-gray-700
                     text-lg placeholder-gray.00/0.500 tracking-wide w-full
                     min-h-[50px]
                     "
                     />
                     {selectedFile && (
                         <div className="relative" >
                         <div className="absolute w-8 h-8 bg-[#15181c]
                         hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center
                         justify-center top-1 left-1 cursor-pointer
                         "
                         onClick={()=>setSelectedFile(null)}
                         
                         
                         >
                             <XIcon className="text-black h-5"/>
                             
                         </div>
                         <img src={selectedFile} alt="" className="rounded-2xl 
                         max-h-80 object-contain
                         "/>

                      </div>
                     )

                     }

                         
                 </div>


                 {!loading && (
         <div className="flex items-center justify-between pt-2.5">
         <div className="flex items-center">
             <div className="icon" onClick={()=>filePickerRef.current.click()}>
                 <PhotographIcon className="h-[22px] 
                 text-[#1d9bf0] "/>

                 <input 
                 type="file"
                 hidden
                 onChange={addImageToPost}
                 ref={filePickerRef}/>
             </div>

             <div className="icon rotate-90">
                 <ChartBarIcon className="h-[22px] text-[#1d9bf0]"/>
                 
             </div>


             <div className="icon" 
             
             onClick={() => setShowEmojis(!showEmojis)}
             >
                 <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]"/>
             </div>
             <div className="icon">
                 <CalendarIcon className="h-[22px] text-[#1d9bf0]"/>
             </div>

             {showEmojis && (
                <Picker
                 onSelect={addEmoji}
                style={{
                    position: 'absolute',
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "300px",
                    borderRadius: "20px",
                }}/>


             )}
                


         </div>

      <button className="
         bg-[#1d9bf0] text-white 
         transition duration-300 ease-in-out

         
         rounded-full px-4 py-1.5
          font-bold shadow-md hover:bg-[#1a8cd8] 
          disabled:hover:bg-[#1d9bf0] disabled:opacity-50 
          disabled:cursor-default"
          disabled={!input.trim() && !selectedFile}
          onClick={sendPost}
  
       >
         Post
       </button>
     </div>
                 )}

        
             </div>
            
        </div>
    )
}

export default Input
