import React, {useEffect, useState} from 'react'
import styles from '../../style/HomeComponent.module.css'
import PostModal from '../Modal/PostModal'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { v4 as uuidV4 } from "uuid";
import PostComponent from '../PostComponent'


function MainComponent({user}) {
    const postRef = collection(db , 'posts') 
    const [ openModal, setopenModal] = useState(false)
    const [postList, setPostList] = useState([])
    
    const StartPost = () => {
        setopenModal(prev => !prev)
    }
    
    const getPost = async () => {
        const data = await getDocs(postRef)
        setPostList(data?.docs.map((doc) =>  ({...doc.data(), id : doc.id }) ))
    }
    
    useEffect(() => {
        getPost()
    }, [])
    
    return (
    <div>
            {openModal && <PostModal openModal={openModal} user={user}  setopenModal={setopenModal} />}
            <div className={styles.main}>
                
                <div className={styles.Header}>
                    <div className={styles.Top}>
                        <img src={`${user?.photoURL}`} alt="" />
                        <button onClick={StartPost}>Start a post</button>
                    </div>
                    <div className={styles.Gallery}>
                        <button>
                            <img src="./photo.svg" alt="" />
                            <span>Photo</span>
                        </button>
                        <button>
                            <img src="./video.avif" alt="" />
                            <span>Video</span>
                        </button>
                        <button>
                            <img src="./event.avif" alt="" />
                            <span>Event</span>
                        </button>
                        <button>
                            <img src="./article.avif" alt="" />
                            <span>Write Article</span>
                        </button>
                    </div>
                </div>
                
                <div className={styles.Body}>
                    {postList?.map((post) => (
                            <PostComponent key={post.id} post={post} user={user} />
                        )
                    )}
                </div>
                
            </div>
    </div>
    )
}

export default MainComponent
