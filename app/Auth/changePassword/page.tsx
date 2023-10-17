'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { updateUser } from '@/supabase/loginDataSB';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import { CustomToastContainer } from '@/components/functions';
import Image from 'next/image';

interface passwordSB {
    password: string;
}

const ChangePassword = () => {
    const { handleSubmit, register } = useForm<passwordSB>();
    const [gmailResetPW, setGmailResetPW] = useState<string>('');
    const router = useRouter();

    const onSubmit: SubmitHandler<passwordSB> = async (data) => {
        let res = await updateUser(data, gmailResetPW, router);
        console.log(res);
        if (res === 'New password should be different from the old password.') {
            toast.error('รหัสผ่านใหม่ควรแตกต่างจากรหัสผ่านเก่า', CustomToastContainer())
        }
        else if (res === 'Password should be at least 6 characters') {
            toast.error('รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร', CustomToastContainer())
        }
    }

    useEffect(() => {
        const access_token: any | null = localStorage.getItem('sb-ufpfqqorfbzlfgglakgo-auth-token');
        if (access_token) {
            const storedData = JSON.parse(access_token);
            if (storedData && storedData.user.email) {
                setGmailResetPW(storedData.user.email);
            } else {
                setGmailResetPW('');
            }
        }
    }, []);

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
                                type='password'
                                className='input_login'
                                placeholder="password"
                                {...register('password')}
                            />
                        </div>
                        <button className='button_login'>confirm</button>
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

export default ChangePassword;