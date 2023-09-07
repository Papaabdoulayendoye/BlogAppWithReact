import styles from '../../style/PostModal.module.css'
import React, { useState } from 'react';
// -----------------
import { Button,Modal } from 'antd';
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import {useNavigate} from 'react-router-dom';

import { db } from '../../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";

    const schemas = yup.object().shape({
        title : yup.string().required("You must add a title!") ,
        description : yup.string().required("You must add a description!"),
        content : yup.string().required("You must add a content!"),
    })


const PostModal = ({ setopenModal, openModal, user }) => {
    const postsRef = collection(db, "posts")
    
    
    const navigate = useNavigate()
    const {register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(schemas)  
    })
    
    
    
    
    const submitPost = async (data) => {
        await addDoc(postsRef, {
            // ...data, 
            title : data.title,
            description : data.description,
            content : data.content,
            username : user?.displayName,
            userId : user?.uid
        })
        
        setopenModal(false)
        window.location.reload(true)
    };
    

    const handleCancel = () => {
        setopenModal(false);
    };
    
    
    return (
    <div className={styles.Container}>
            <Modal
                title="CREATE A POST"
                open={openModal}
                onCancel={handleCancel}
                footer={
                    []
                }
            >
                <form onSubmit={handleSubmit(submitPost)}  className={styles.formBx}>
                    
                    <div className={styles.inputBx}>
                        <span>Title</span>
                        <input type="text" {...register('title')} placeholder='Title' />
                        {errors.title?.message && <p className={styles.errors}>{errors.title.message}</p>}
                    </div>
                    <div className={styles.inputBx}>
                        <span>Description</span>
                        <input type="text" {...register('description')} placeholder='Description' />
                        {errors.description?.message && <p className={styles.errors}>{errors.description.message}</p>}
                    </div>
                    <div className={styles.inputBx}>
                        <span>Content</span>
                        <textarea {...register('content')} placeholder='Make a post'   />
                        {errors.content?.message && <p className={styles.errors}>{errors.content.message}</p>}
                    </div>
                    <Button htmlType="submit" type='primary' className={styles.submitBTN}>Post</Button>
                </form>
            </Modal>
    </div>
    );
};

export default PostModal;