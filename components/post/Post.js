function Post({id,post, postPage}) {
    return (
        <div className="p-3 flex cursor-pointer
        border-b border-gray-200">
            {!postPage && <img src={post?.userImg } alt=""/>}
            


            
        </div>
    )
}

export default Post
