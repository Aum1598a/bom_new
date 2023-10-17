'use client'
import { ChangeEvent, useEffect, useState, useReducer } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FetchBomdata_v2, FetchItem, FetchRevisDivision } from '@/supabase/fetchDataSB';
import { Updatebomdata_v2 } from '@/supabase/updateDataSB';
import { InsertReviseModel, InsertReviseItemOBU, InsertRevisDivision, Insertbomdata_v2 } from '@/supabase/insertDataSB';
import { CustomToastContainer } from "@/components/functions";
import { toast } from "react-toastify";
import { UploadStorage } from '@/supabase/storage';
import { DataTableRevise } from '@/components/tasks/data-table';
import { columnRevise } from '@/components/tasks/component/columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FromECO = [string, string];

export default function ReviseModel() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [state, dispatch] = useReducer(reducer, { data: [] });//20-6578-A0-1N 11-6347-00-1N
    const [searchMaster, setSearchMaster] = useState<string>('');
    const [checkInI, setCheckInI] = useState<string>('');
    const [checkInDE, setCheckInDE] = useState<string>('');
    const [itemUpdate, setItemUpdate] = useState<any>();
    const fromItemECO: FromECO[] = [
        ['description', 'string'], ['end_effective', 'Date'], ['remarks', 'string'], ['file', 'file']
    ];
    const fromNewLink: FromECO[] = [
        ['item_number', 'string'], ['start_effective', 'Date'], ['qty_per', 'number'], ['reference', 'string'],
        ['scrap', 'string'], ['lt_ofset', 'string'], ['op', 'string'], ['sequence_number', 'string'],
        ['forecast', 'string'], ['option_group', 'string'], ['process', 'string'], ['boi_scrap', 'string']];

    const checkfromItemECO: string[] = ['description', 'end_effective', 'remarks']; //'file'
    const checkfromNewLink: string[] = ['item_number', 'start_effective', 'qty_per'];
    const handleonClick = async () => {
        const data = await FetchBomdata_v2(searchMaster);
        dispatch({ type: 'SET_DATA', payload: data });
    }

    const IDUserTIT = () => { return '1579' }//return JSON.parse(sessionStorage.getItem('user') ?? '').username || null };

    const handleRevise = (event: ChangeEvent<HTMLInputElement>) => {
        let data = JSON.parse(event.target.value)
        setItemUpdate(data);
    };

    const handleMasterDivision = (data: any) => {
        let parent_id = state.datafilter.filter((arraydataitem: any) => arraydataitem.item_number === itemUpdate.parent_item);
        console.log(parent_id);
        if (parent_id.length > 0) {
            return parent_id[0].trans;
        } else {
            return null;
        }
    }

    const fromDate = () => {
        return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '') + new Date().toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '');
    };

    const setAdd = () => {
        let addresss = itemUpdate?.address ? itemUpdate.address : null;
        return addresss;
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
        let checkItem: number = (await FetchItem(data.item_number)).length;
        if (itemUpdate !== undefined) {
            if (checkItem >= 1) {
                let checkStatusInI = '';
                if (checkInI !== 'pass') {
                    checkStatusInI = await handleInsertNewComponentItem(data);
                    checkStatusInI === 'error' ? toast.error('กรุณากรอกข้อมูลช่อง start_effective กับ qty_per ให้ถูกต้อง', CustomToastContainer()) : null;
                    setCheckInI(checkStatusInI);
                }
                if (checkStatusInI === 'pass' || checkInI === 'pass') {
                    let checkStatusInDE = '';
                    if (checkInDE !== 'pass') {
                        checkStatusInDE = await handleInsertDocECO(data);
                        checkStatusInDE === 'error' ? toast.error('กรุณากรอกข้อมูลส่วน "ไอเท็มที่หยุดการใช้" ให้ถูกต้อง', CustomToastContainer()) : null;
                        setCheckInDE(checkStatusInDE);
                    } if (checkStatusInDE === 'pass' || checkInDE === 'pass') {
                        let checkStatusUPcom = await handleUpdataComponentItem(data);
                        handleDivision(data);
                        handleInsertRegister(data);
                        toast.success('แก้ไขสำเร็จ', CustomToastContainer());
                        setCheckInI(''); setCheckInDE('');
                        UploadStorage(data.file[0], data.remarks);
                        checkStatusUPcom ? (() => { handleonClick(); })() : null;
                        return reset();
                    }
                }
            }
            else {
                toast.error(data.item_number ? 'ไม่มีข้อมูลในระบบ' : 'กรุณากรอกข้อมูลช่อง item_number', CustomToastContainer());
            }
        }
        else if (itemUpdate === undefined) {
            toast.error('กรุณาเลือกข้อมูลจาก Tabel', CustomToastContainer());
        }
    };

    const handleInsertNewComponentItem = async (data: any) => {
        const dataBomNewitem = {
            trans: data?.item_number + setAdd(),
            master_item: itemUpdate?.master_item,
            parent_item: itemUpdate?.parent_item,
            item_number: data.item_number,
            address: setAdd(),
            start_effective: data.start_effective,
            qty_per: data.qty_per,
            level: itemUpdate?.level,
            status_item: 'latest',
            usertit: IDUserTIT()
        }
        const InsertNewComponentItem = await Insertbomdata_v2([dataBomNewitem]);
        return InsertNewComponentItem;
    };

    const handleUpdataComponentItem = async (data: any) => {
        const dataUpdataitem = {
            trans: itemUpdate?.trans,
            end_effective: data.end_effective,
            status_item: 'disuse',
            remarks: data.remarks
        }
        const UpdataComponentItem = await Updatebomdata_v2(dataUpdataitem);
        return UpdataComponentItem;
    };

    const handleInsertDocECO = async (data: any) => {
        const dataInsertDocECO = {
            id_eco: data.remarks,
            relevant_parties: null,
            user_eco: IDUserTIT(),
            document_eco: data.remarks
        }
        const InsertDocECO = await InsertReviseModel(dataInsertDocECO);
        return InsertDocECO;
    };

    const handleInsertRegister = async (data: any) => {
        const dataRegisterRevise = {
            id_item: 'Rev' + itemUpdate?.master_item + itemUpdate?.parent_item + itemUpdate?.item_number + data.remarks,
            usertit: IDUserTIT(),
            statusrpa13_5: 'default',
            statusrpa1_4_3: 'default',
            parent_item: itemUpdate?.parent_item,
            item_number: itemUpdate?.item_number,
            end_effective: data.end_effective,
            remarks: data.remarks
        }
        const dataRegisterNew = {
            id_item: 'Rev' + fromDate() + itemUpdate?.master_item + itemUpdate?.parent_item + data.item_number,
            usertit: IDUserTIT(),
            statusrpa13_5: 'default',
            statusrpa1_4_3: 'default',
            parent_item: itemUpdate?.parent_item,
            item_number: data.item_number,
            start_effective: data.start_effective,
            qty_per: data.qty_per,
            reference: data.reference,
            scrap: data.scrap,
            lt_ofset: data.lt_ofset,
            op: data.op,
            sequence_number: data.sequence_number,
            forecast: data.forecast,
            option_group: data.option_group,
            process: data.process,
            boi_scrap: data.boi_scrap
        }
        const InsertRegister = await InsertReviseItemOBU([dataRegisterRevise, dataRegisterNew]);
        return InsertRegister;

    };

    const handleDivision = async (data: any) => {
        let division = (await FetchRevisDivision(handleMasterDivision(data))).length;
        division >= 0 ? InsertRevisDivision({
            id_revis_division: 'Div' + data.remarks + data.item_number,
            changed_item: itemUpdate ? itemUpdate.trans : '',
            master_division: division,
            id_parent: handleMasterDivision(data)
        }) : null
    };


    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-11/12 grid grid-cols-12'>
                <div className='mr-5 col-span-12 lg:col-span-5 mb-5'>
                    <div className='flex'>
                        {/* <Input placeholder="Filter Item..." onChange={(event) => setSearchMaster(event.target.value)} className="h-10 w-[150px] lg:w-[250px] mb-4" />
                        <Button onClick={handleonClick} className="" style={{ background: '#3b82f6' }}>ค้นหา</Button> */}
                    </div>
                    <DataTableRevise columns={columnRevise} data={state.datafilter ? state.datafilter : []} handleRevise={handleRevise} setTextSearch={setSearchMaster} handleonClick={handleonClick} />

                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='border rounded-xl p-4 col-span-12 lg:col-span-6'>
                    <div className='flex items-center mb-5'>
                        <div className='flex items-center w-6/12 '>
                            <p className='mr-5' >parent : </p>
                            <p className='text-sm text-muted-foreground'> {itemUpdate?.parent_item ? itemUpdate.parent_item : null}</p>
                        </div>
                        <div className='flex items-center'>
                            <p className='mr-5' >item : </p>
                            <p className='text-sm text-muted-foreground'>{itemUpdate?.item_number ? itemUpdate.item_number : null}</p>
                        </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">ไอเท็มที่หยุดการใช้</h3>
                    <div className='shrink-0 bg-border h-[1px] w-full mb-2 '></div>
                    <div className='mb-5'>
                        {fromItemECO.map((item: any, index: any) => (
                            <div key={index} className='flex justify-between mb-1 items-center'>
                                <div className='w_120'>
                                    <p className='whitespace-nowrap	text-base'>{item[0]} : </p>
                                </div>

                                <div className='flex items-center'>

                                    {errors[item[0]] && (
                                        <p className="text-red-600 text-sm mr-2.5">Please fill out</p>
                                    )}
                                    {checkfromItemECO.includes(item[0]) ?
                                        <p className="text-red-600 text-sm mr-2.5">*</p> : null
                                    }

                                    <Input
                                        type={item[1]}
                                        className='h-8	w-72	'
                                        placeholder={`Enter ${item[0]}`}
                                        {...register(item[0], { required: checkfromItemECO.includes(item[0]) })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            if (item[0] !== 'file') {
                                                const trimmedValue = inputElement.value.trim();
                                                inputElement.value = trimmedValue.toUpperCase();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="text-lg font-medium mb-2">ไอเท็มที่เปลี่ยนใหม่</h3>
                    <div className='shrink-0 bg-border h-[1px] w-full mb-2 '></div>
                    <div>
                        {fromNewLink.map((item: any, index: any) => (
                            <div key={index} className='flex justify-between mb-1 items-center'>
                                <div className='w_120'>
                                    <p className='whitespace-nowrap	text-base'>{item[0]} : </p>
                                </div>

                                <div className='flex items-center'>
                                    {errors[item[0]] && (
                                        <p className="text-red-600 text-sm mr-2.5">Please fill out</p>
                                    )}
                                    {checkfromNewLink.includes(item[0]) ?
                                        <p className="text-red-600 text-sm mr-2.5">*</p> : null
                                    }
                                    <Input
                                        type={item[1]}
                                        className='h-8 w-72 min-w-0 '
                                        placeholder={`Enter ${item[0]}`}
                                        step="0.0001"
                                        {...register(item[0], { required: checkfromNewLink.includes(item[0]) })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end mt-2.5 '>
                        <Button style={{ backgroundColor: '#28D39A' }}>ยืนยัน</Button>
                    </div>
                </form>
            </div>
        </div >
    );
};

const reducer = (state: any, action: any) => {//datas
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload, datafilter: action.payload };
        case 'SET_SEARCH_TERM':
            const searchTerm = action.payload;
            const filteredData = state.data.filter((item: any) => item.item_number === searchTerm);
            return {
                ...state,
                datafilter: searchTerm ? filteredData : state.data,
            };
        default:
            return state;
    }
};