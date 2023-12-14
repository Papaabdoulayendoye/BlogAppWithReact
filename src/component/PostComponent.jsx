import React, {useEffect, useState} from 'react'
import styles from '../style/HomeComponent.module.css'
import { FaThumbsUp, FaRegThumbsUp, FaCommentAlt } from "react-icons/fa";
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from 'firebase/firestore';
function PostComponent({ post, user }) {
    
    const likesRef = collection(db, "likes")
    
    const likesDoc = query(likesRef, where("postId", "==", post.id ) )
    
    const [likes, setLikes] = useState(null) 
    
    const likePost = async () => {
        try {
            await addDoc(likesRef, {
            userId : user?.uid,
            postId : post.id
            })
            if (user){
                setLikes((prev) => 
                {
                    return  prev ? [...prev, {userId : user.uid} ] : [ {userId : user.uid} ]
                })
            }
        } catch (error) {
            console.log(error);
        }
    };
    // const likesRef = collection(db, "likes")
    // const likesDoc = query(likesRef, where("postId", "==", post.id ) )
    // const [likes, setLikes] = useState(null) 
    // -----------------------------------
    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data?.docs.map((doc) =>  ({ userId : doc.data().userId})  ))
    }
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid) 
    // -----------------------------------------
    // -----------------------------------
    const removeLike = async () => {
        try {
            const likeDeleteQuery = query(likesRef, where("postId", "==", post.id ), where("userId", "==", user?.uid ) )
            const likeTodoData = await getDocs(likeDeleteQuery)
            const likeToDelete = doc(db, 'likes', likeTodoData.docs[0].id)
            await deleteDoc(likeToDelete)
            if (user){
                setLikes((prev) => (prev?.filter(like => like.id === likeTodoData.docs[0].id ) ) )
            }
        } catch (error) {
            console.log(error);
        }
    };
    // -----------------------------------------
    
    useEffect(() => {
        getLikes()
    },[])
    
    
    return (
        <div className={styles.usersPosts}>
            <div className={styles.username}>
                <span>posted by - @{post?.username ? post?.username : user.email}</span>
            </div>
            <div className={styles.title}>
                <h1>
                    title - {post.title}
                </h1>
                <p> description - {post.description}</p>
            </div>
            <div className={styles.content}>
                <p>{post.content}</p>
                
            </div>
            <div className={styles.Likes}>
                <button onClick={hasUserLiked ? () => removeLike() : likePost }> 
                    {hasUserLiked ? <FaThumbsUp  className={styles.active} /> :  <FaThumbsUp /> } 
                    {likes?.length > 0 ? (<> {likes?.length} j'aime{likes?.length > 1 ? 's' : '' } </>) : (<>j'aime</>)} 
                </button>
                <button> <FaCommentAlt /> Commenter </button>
            </div>
        </div>
    )
}

export default PostComponent
