'use client'
import { useEffect, useState } from 'react';
import { SendResetPassword } from '@/supabase/loginDataSB';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import Image from 'next/image';

interface ResetPW {
    mail: string;
}

const ResetPassword = () => {
    const { handleSubmit, register } = useForm<ResetPW>();

    const onSubmit: SubmitHandler<ResetPW> = (data) => {
        SendResetPassword(data);
    };

    return (
        <div className='login_body'>
            <div className=''>
                <div className='logo_body'>
                    <Image
                        className="logoimg"
                        src="/TYC-Logo_Blue.png"
                        alt="TYC Logo"
                        width={200}
                        height={100}
                    />                </div>
                <div className='form_login'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text_head'>Sign in</h1>
                        <div className='input_login_body'>
                            <input
                                type="text"
                                className='input_login'
                                placeholder="E-mail"
                                {...register('mail')}
                            />
                        </div>
                        <button className='button_login'>
                            send
                        </button>
                    </form>
                    <div className='login_link_body'>
                        <Link href="/"><p className='link_text'>Log in</p></Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );

};

export default ResetPassword;