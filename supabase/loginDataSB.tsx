'use client'
import { UserAttributes } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { CustomToastContainer } from '@/components/functions';
import { toast } from "react-toastify";
import type { Database } from '@/app/lib/database.types'

interface LoginFrom {
    mail: string;
    password: string;
}

interface RegisterFrom {
    mail: string;
    password: string;
    passwordConfirm: string;
    name: string;
    division: string;
}

interface ResetPW {
    mail: string;
}

interface passwordSB {
    password: string;
}


interface ExtendedUserAttributes extends UserAttributes {
    user_metadata: {
        division: string;
        username: string;
    };
}
const supabase = createClientComponentClient<any>()

export const LoginSB = async (loginData: LoginFrom) => {    

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.mail,
        password: loginData.password,
    });

    if (error) {
        console.error('error Login =>', error.message);
        return error.message;
    } else {
        console.log('Success Login =>', data.user.email);
        sessionStorage.setItem('access_token', data?.session.access_token);
        let userEmail = data?.user.email;
        let user_metadata: object = data?.user?.user_metadata ? data.user.user_metadata : { employee: '' };
        sessionStorage.setItem('email', userEmail ?? '');
        sessionStorage.setItem('user', JSON.stringify(user_metadata));
        // router.push('/');

        return data || [];
    }
};

export const SignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log('error SignOut => ', error.message);
        return 'error'
    }
    else {
        console.log('Success SignOut => ');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('email');
        return 'success'
    }
};

export const SignUP = async (formData: RegisterFrom) => {
    console.log('SignUP', formData);
    try {
        const { data, error }: { data: any; error: Error | null } = await supabase.auth.signUp({
            email: formData.mail,
            password: formData.password,
            options: {
                data: {
                    username: formData.name,
                    division: formData.division,
                }
            }
        })
        if (error != null) {
            console.error('Error SignUP => ', error.message)
        } else if (data) {
            console.log('Success SignUP => ', data);
            // router.push('/loginPage');
        }
    } catch (error) {
        toast.error('Error signing up user:' + (error as Error).message, CustomToastContainer());
    }
};

export const SendResetPassword = async (emailReset: ResetPW) => {
    console.log('G-mail', emailReset.mail);
    let { } = await supabase.auth.resetPasswordForEmail(emailReset.mail, {
        redirectTo: 'http://localhost:3000/Auth/changePassword',
    })
}

export const updateUser = async (passwordReset: passwordSB, gmailResetPW: string, router: any) => {
    const { data, error } = await supabase.auth.updateUser({
        email: gmailResetPW,
        password: passwordReset.password,
    });
    if (error) {
        console.error('error updateUser => ', error.message);
        return error.message;
    } else {
        console.log('Success updateUser => ');
        toast.success('เปลี่ยนรหัสเสร็จสิ้น ', CustomToastContainer());
        setTimeout(() => {
            router.push('/');
        }, 1100);
        return data || []
    }

}

export const updateUserMetadata = async (updateMetadata: object) => {
    const keys = Object.keys(updateMetadata);
    console.log(keys[0]);

    const { data, error } = await supabase.auth.updateUser({
        email: 'aumnew1598@gmail.com',
        data:
            updateMetadata
    } as ExtendedUserAttributes);

    if (error) {
        console.error('error update user Porfile => ', error.message);
    } else {
        console.log('Success update user Porfile => ', data);
        let user_metadata: object = data?.user.user_metadata;
        sessionStorage.setItem('user', JSON.stringify(user_metadata));
        toast.success(`update ${keys[0]} succeed`, CustomToastContainer());
        setTimeout(() => {
            window.location.reload();
        }, 1100);
    }
}


