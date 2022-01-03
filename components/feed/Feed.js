
import {SparklesIcon} from '@heroicons/react/outline'

import Input from '../input/Input';
function Feed() {
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
        </div>
    )
}

export default Feed
