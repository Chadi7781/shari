import { XIcon ,PhotographIcon, EmojiHappyIcon, ChartBarIcon, CalendarIcon} from '@heroicons/react/outline';
import {useState,useRef} from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
function Input() {

    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] =useState(null);
    const [showEmojis, setShowEmojis] = useState(false);


    const filePickerRef = useRef(null);

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((e1) => codesArray.push("0x"+e1));
        let emoji = String.fromCodePoint(...codesArray);
        setInput( input + emoji);

    }


    const addImageToPost = () => {

    }
    return (
        <div className={`border-b border-x-gray-300 p-3
                        flex space-x-3 overflow-y-scroll
    
        `}>
            <img src="https://lh3.googleusercontent.com/fife/AAWUweUMC2zfpoqMHzmuRK92U5xT0VQGQHXD8YDisDjkJj4rXGGxCw_EzVrKLS32dPowO1wxdgPoluuz00SqVZVnTt-ppAd0GHJnprmMEyyQ-gB-Chy4JzLmB9-wATUHJf5jBFe_NLHTDLTBnbdtO1ayhVQHL6KfuQZFp7-RRo5wTXMdRmYQ4z2eJiZaRnsrsA7rJR1ZjhsBsmmQ4Q4IlasN3twkrEyqor_lY_ThNGCKBhEYCxfn0wZ1Rnu5wtos_xJUnQDP_CXnjIONIJKPWe7f6lzagf7U4HFypN6kh9SWs8EFaQ0yc7Q36tpTZa1rrZTbUlVnIZi580d7Ow1f40bXueLCYOQ0m6DzGHkTasXLFeuVIdWene5nby__OR_b6I9wO5KGtbYhrrCGHZjWH-xjs3QQSdUBKTm7-sDA6jXnJFpOYC7kn3F9FuI-dK-yFNKlwha9WgAZn2Cj_6K8b0GWRtrnhtjRH7hi7djBdHRclTafUPhdqryUJ4oBYwZz86q73L138jyLZnWqFwy_IdYnuxGYvVpcm8sMcnIILcRhVoH4z97xcyX3f2EmQmG7PcWNwsKu1EZ1T5pmt5Q_lpLURP_dcKtg8675kZIxpR60icFvEGhREiQb7jIAQTFUF1L1JO_QzsFzrrF4xCwmMv4tz9X-_dhY1Tpm-lSsxiXkUMXciAdUL00dNpjzanPJT6HuonyhWofAac69swjMgHQ4N8pkna-_3PPHtINdQ-hHcq2SUg=s83-c"
             alt=""
             className="h-11 w-11 rounded-full cursor-pointer"
             /> 

             <div className="w-full divide-y divide-gray-300">
                 <div className={``}>
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
                         onClick={()=>selectedFile(null)}
                         
                         
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
              
                   >
                     Post
                   </button>
                 </div>
             </div>
            
        </div>
    )
}

export default Input
