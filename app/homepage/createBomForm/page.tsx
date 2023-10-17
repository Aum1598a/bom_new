'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InsertitemtitForm, InsertRegisterbom } from '@/supabase/insertDataSB';
import { CustomToastContainer } from "@/components/functions";
import { toast } from "react-toastify";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface dataForm {
  id_item: string;
  item_number: string;
  um: string;
  description: string;
  prod_line: number;
  bom_release: Date;
  item_type: string;
  grouptit: string;
  s_t: string;
  size_l_w_h: string;
  ecn_rev: string;
  suite_mold: string;
  oem_cust: string;
  project: string;
  status_item: string;
  usertit: string;
}

type nameColumnType = [string, string, string];

export default function Index() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [resultInsert, setResultInsert] = useState<dataForm[]>([]);
  const [statusModel, setStatusModel] = useState<boolean>(false);
  const nameColumn: nameColumnType[] = [['item number', 'item_number', 'text'], ['unit', 'um', 'text'], ['description', 'description', 'text'], ['prod line', 'prod_line', 'number'],
  ['date release', 'bom_release', 'date'], ['item type', 'item_type', 'text'], ['group', 'grouptit', 'text'], ['set', 's_t', 'text'], ['size - l,w,h ', 'size_l_w_h', 'text'],
  ['ecn rev', 'ecn_rev', 'text'], ['suite mold', 'suite_mold', 'text'], ['oem cust', 'oem_cust', 'text'], ['project', 'project', 'text']];
  
  const checkSubmitLink: string[] = ['item_number', 'um', 'description', 'prod_line', 'bom_release', 'item_type', 'grouptit'];

  const IDUserTIT = () => {
    return '1598'
    // return JSON.parse(sessionStorage.getItem('user') ?? '').username || null 
  };

  const setPrimaryKeydate = () => {
    let dateMYMH = new Date();
    let date = dateMYMH.getDate(); let month = dateMYMH.getMonth() + 1; let year = dateMYMH.getFullYear();
    let minutes = dateMYMH.getMinutes(); let hours = dateMYMH.getHours();
    let dateTime: string = `${date.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}-${minutes.toString().padStart(2, '0')}${hours.toString().padStart(2, '0')}`
    return dateTime;
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const statusInsert = await InsertitemtitForm([{ ...data, id_item: data.item_number, status_item: 'use', usertit: IDUserTIT() }]);
    if (statusInsert !== 'error') {
      // handleResultInsertitem(statusInsert);
      const statusInsertRegisterbom = await InsertRegisterbom([{ ...data, id_item: 'Reg' + setPrimaryKeydate() + data.item_number, usertit: IDUserTIT(), statusrpa1_4_3: 'default' ,statusrpa13_5: 'default'}])
      if (statusInsertRegisterbom !== 'error') {
        toast.success(`เพิ่มไอเท็ม ${data.item_number} สำเร็จ`, CustomToastContainer());
        reset();
      }
    }
    else { toast.error(`อาจมีข้อมูลไอเท็ม "${data.item_number}" อยู่แล้ว กรุณาเช็คไอเท็มก่อน`, CustomToastContainer()); }
  };

  const handleResultInsertitem = (result: dataForm[]) => {
    setResultInsert(result);
    setStatusModel(true);
  };


  return (
    <div className='flex justify-center mt-4 ' >
      <div className='w-11/12' >
        <div className='flex justify-center'>
          <div className='lg:w-8/12 2xl:w-6/12 w-10/12 create_form_body'>
            <p className='text-lg	mb-2'>เพิ่มไอเท็มใหม่</p>
            <div className='p-3.5 rounded border'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {nameColumn.map((item: string[], index: number) => {
                  return <div key={index} className='flex items-center justify-between	 mb-1'>
                    <p className='color_white'>{item[0]} : </p>
                    <div className='flex whitespace-nowrap items-center'>
                      {errors[item[1]] && (
                        <p className="text-red-600 text-sm mr-2.5">Please fill out</p>
                      )}
                      {checkSubmitLink.includes(item[1]) ?
                        <p className="text-red-600 text-sm mr-2.5">*</p> : null
                      }
                      <Input
                        type={item[2]}
                        className='h-8 w-52 md:w-72'
                        placeholder={`Enter ${item[0]}`}
                        {...register(item[1], { required: checkSubmitLink.includes(item[1]) })}
                        onInput={(e) => {
                          const inputElement = e.target as HTMLInputElement;
                          const trimmedValue = inputElement.value.trim();
                          inputElement.value = trimmedValue.toUpperCase();
                        }}
                      />
                    </div>
                  </div>
                })}
                <div className='underline mt_10'></div>
                <div className='flex justify-end mt-2.5 '>
                  <Button style={{ backgroundColor: '#28D39A' }}>ยืนยัน</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}