'use client'
import { useEffect, useState } from 'react';
import { updateUserMetadata } from '@/supabase/loginDataSB';
import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface user {
    username: string;
    division: string;
}


const Profile = () => {
    const [doModal, setDoModal] = useState<boolean>(false);
    const [storedEmail, setStoredEmail] = useState<string | null>('');
    const [keyName, setKeyName] = useState<string | undefined>('');
    const [storedData, setstoreData] = useState<string | undefined>('');
    const [storedUser, setStoredUser] = useState<user | null>();
    const [updateMetadata, setUpdateMetadata] = useState<object>();

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        let user = sessionStorage.getItem('user');
        setStoredEmail(email);
        setStoredUser(JSON.parse(user ?? ''));
    }, []);

    const handleModal = (namekey: string, storeUsername: string | undefined) => {
        setKeyName(namekey);
        setstoreData(storeUsername);
        setDoModal(!doModal)
    }

    useEffect(() => {
        console.log('updateMetadata', updateMetadata);
        if (updateMetadata !== undefined) {
            updateUserMetadata(updateMetadata);
        }
    }, [updateMetadata]);

    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-6/12' >
                <Card>
                    <CardHeader>
                        <CardTitle>โปรไฟล์</CardTitle>
                        <CardDescription>
                            กรุณาแก้ไขข้อมูลเมื่อมีการเปลี่ยนแปลง
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid items-center justify-between grid-cols-2">
                            <div className="grid items-center grid-cols-3 w-full">
                                    <p className="text-base font-medium leading-none">ชื่อผู้ใช้งาน : </p>
                                    <p className="text-base text-muted-foreground "> {storedUser?.username || ''}</p>
                            </div>
                            <div className='flex justify-end'>
                                <Button>
                                ssss
                            </Button>
                            </div>
                        </div >
                        <div className="grid items-center justify-between grid-cols-2">
                            <div className="grid items-center grid-cols-3 w-full" >
                                <p className="text-base font-medium leading-none">แผนก : </p>
                                <p className="text-base text-muted-foreground "> {storedUser?.division || ''}</p>
                            </div>
                            <div className='flex justify-end'>
                                <Button>
                                ssss
                            </Button>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>


                {/* <div className='card-canter'>
                <div className='profile-template'>
                    <div className='display-justify-between my-15'>
                        <p>ID user : </p>
                        <div className='display-flex'>
                            <p className='mr-20'>{storedUser?.username || ''}</p>
                            <button onClick={() => handleModal('username', storedUser?.username)} ></button>
                        </div>
                    </div>
                    <div className='underline'></div>
                    <div className='display-justify-between my-15'>
                        <p>division : </p>
                        <div className='display-flex'>
                            <p className='mr-20'>{storedUser?.division || ''}</p>
                            <button onClick={() => handleModal('division', storedUser?.division)}> </button>
                        </div>
                    </div>
                </div>
            </div> */}

            </div></div>
    );
};

export default Profile;



{/* <ModalProfile doModal={doModal} setDoModal={setDoModal} keyName={keyName} storedData={storedData} setUpdateMetadata={setUpdateMetadata} /> */ }
