'use client'
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignUP } from '@/supabase/loginDataSB';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image';

interface RegisterFrom {
    mail: string;
    name: string;
    division: string;
    password: string;
    passwordConfirm: string;
}

export default function Register() {
    const { handleSubmit, register, setError, formState: { errors } } = useForm<RegisterFrom>();

    const validateForm = (validate: RegisterFrom) => {
        const { mail, password, passwordConfirm, division, name } = validate;
        if (mail === "") {
            setError('mail', { type: 'required', message: 'Please fill out' });
            return false;
        }

        else if (password === "") {
            setError('mail', { type: 'required', message: 'Please fill out' });
            return false;
        }
        else if (division === "division" || division === "") {
            setError('division', { type: 'required', message: 'Please fill out.' });
            return false;
        }

        else if (password.length < 6) {
            return false;
        }

        else if (password !== passwordConfirm && passwordConfirm !== '') {
            setError('passwordConfirm', { type: 'required', message: 'Confirm password does not match.' });
            return false;
        }


        else if (passwordConfirm === "") {
            console.log('sss');

            setError('passwordConfirm', { type: 'required', message: 'Please fill out.' });
            return false;
        }
        return true;
    };
    const onSubmit: SubmitHandler<RegisterFrom> = (data) => {
        if (validateForm(data)) {
            SignUP(data);
        }
    }

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
                    <form className='loginform' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text_head'>Register</h1>
                        <div className='input_login_body'>

                            <input
                                type="email"
                                className='input_login'
                                placeholder="E-mail"
                                {...register('mail', {
                                    required: true,
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Password 6 อักษร A-Z, a-z, Number. ห้ามมีสํญลักณ์พิเศษ"
                                    }
                                })}
                            />
                            {errors.mail && <p className="red-color">{errors.mail.message}</p>}
                        </div>
                        <div className='input_login_body'>
                            <input
                                type="text"
                                className='input_login'
                                placeholder="UserName"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <p className="red-color">{errors.name.message}</p>}
                        </div>
                        <div className='input_login_body'>
                            <select className='input_login cursor' {...register('division')} defaultValue="division">
                                <option disabled value="division">division</option>
                                <option value="PI">PI</option>
                                <option value="PC">PC</option>
                                <option value="PU">PU</option>
                                <option value="PT">PT</option>
                                <option value="QA">QA</option>
                                <option value="PORD">PORD</option>
                                <option value="Sales">Sales</option>
                            </select>
                            {errors.division && <p className="red-color">{errors.division.message}</p>}
                        </div>
                        <div className='input_login_body'>
                            <input
                                type='password'
                                className='input_login'
                                placeholder="password"
                                {...register("password", {
                                    required: true,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                                        message: "Password 6 อักษร A-Z, a-z, Number. ห้ามมีสํญลักณ์พิเศษ"
                                    }
                                })}
                            />
                            {errors.password && <p className="red-color">{errors.password.message}</p>}
                        </div>
                        <div className='input_login_body'>
                            <input
                                type='password'
                                className='input_login'
                                placeholder="password"
                                {...register('passwordConfirm')}
                            />
                            {errors.passwordConfirm && <p className="red-color">{errors.passwordConfirm.message}</p>}
                        </div>
                        <button className='button_login'>Register</button>
                    </form>
                    <div className='login_link_body'>
                        <Link href="/" ><p className='link_text'>Log in</p></Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )

}
