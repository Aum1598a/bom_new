'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { LoginSB } from '@/supabase/loginDataSB';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { CustomToastContainer } from '@/components/functions';
import Image from 'next/image';

interface LoginFrom {
  mail: string;
  password: string;
}

export default function Home() {
  const { handleSubmit, register } = useForm<LoginFrom>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFrom> = async (datas) => {
    if (datas.mail === '' || datas.password === '') {
      toast.error('กรุณากรอกข้อมูล', CustomToastContainer())
    }
    else {
      const result = await LoginSB(datas);
      result === 'Invalid login credentials' ? toast.error('ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง', CustomToastContainer()) : router.push('/homepage');
    }

    //dddd
  }
  const handleCheckboxChange = () => setShowPassword((prevShowPassword) => !prevShowPassword);
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
          />
        </div>
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
            <div className='input_login_body'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='input_login'
                placeholder="password"
                {...register('password')}
              />
            </div>
            <div className='checkbox_login_body'>
              <input
                type="checkbox"
                className='checkbox_input cursor'
                checked={showPassword}
                onChange={handleCheckboxChange}
              />
              <p>Show Password</p>
            </div>
            <button className='button_login'>Log in</button>

          </form>
        </div>
        <div className='login_link_body'>
          <Link href="/Auth/register"><p className='link_text'>Register</p></Link>
          <Link href="/Auth/resetPassword"><p className='link_text'>Reset password</p></Link>
        </div>
      </div>
      <button type="button" onClick={() => router.push('/homepage')}>
      </button>
      <ToastContainer />
    </div>
  )
}
