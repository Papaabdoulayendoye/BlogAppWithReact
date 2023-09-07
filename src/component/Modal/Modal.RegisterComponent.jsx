import React, { useState } from 'react';
import { Button,Modal, Form } from 'antd';
import styles from '../../style/RegisterComponent.module.css'
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterAPI } from '../../api/AuthAPI';
import {useNavigate, useLocation} from 'react-router-dom';

    const schemas = yup.object().shape({
        email : yup.string().email().required("Please input your Email!") ,
        password : yup.string().min(6).max(25).required("Please input your password!"),
        confirmPassword : yup.string().oneOf([yup.ref("password"), null],"Your Password should be match!").required(),
    })



const ModalRegister = ({ setopenModal, openModal }) => {
    
    const navigate = useNavigate()
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {register, handleSubmit, formState : {errors} } = useForm({
        resolver : yupResolver(schemas)  
    })
    
    
    
    const submitForm = async (data) => {
        await RegisterAPI(data.email, data.password)
        setopenModal(false)
    };
    

    const handleCancel = () => {
        setopenModal(false);
    };
    
    
    return (
    <div className={styles.Container}>
            <Modal
                title="REGISTER NOW"
                open={openModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={
                    []
                }
            >
                <form onSubmit={handleSubmit(submitForm)}  className={styles.formBx}>
                    
                    <div className={styles.inputBx}>
                        <span>Email</span>
                        <input type="email" {...register('email')} placeholder='Email' required/>
                        {errors.email?.message && <p className={styles.errors}>{errors.email.message}</p>}
                    </div>
                    <div className={styles.inputBx}>
                        <span>Password</span>
                        <input type="password" {...register('password')} placeholder='Password' required/>
                        {errors.password?.message && <p className={styles.errors}>{errors.password.message}</p>}
                    </div>
                    <div className={styles.inputBx}>
                        <span>Confirm password</span>
                        <input type="password" {...register('confirmPassword')} placeholder='Confirm password'  required />
                        {errors.confirmPassword?.message && <p className={styles.errors}>{errors.confirmPassword.message}</p>}
                    </div>
                    <Button htmlType="submit" type='primary' className={styles.submitBTN}>Register</Button>
                </form>
            </Modal>
    </div>
    );
};

export default ModalRegister;