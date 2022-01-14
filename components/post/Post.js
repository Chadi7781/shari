function Post({id,post, postPage}) {
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
                                    sm:text-base mt-0.5
                                
                                ">{post?.text}</p>
                            )}
                                




                    </div>
                </div>
            </div>
            


            
        </div>
    )
}

export default Post
