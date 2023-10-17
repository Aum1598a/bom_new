'use client'
import { useEffect, useState, useReducer } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Fetch_set_carton_box, Fetch_pack } from '@/supabase/fetchDataSB';
import { InsertSet_carton_box, Insertpack_std } from '@/supabase/insertDataSB';
import { UploadStoragePack, UploadStorageWI } from '@/supabase/storage';
import { UpdatePackSTD, UpdateBoxSize } from '@/supabase/updateDataSB';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from "@/components/ui/separator"
import { columnPackSTD, columnsPack_STD } from '@/components/tasks/component/columns';
import { DataTable } from '@/components/tasks/data-table';
import { CustomToastContainer } from "@/components/functions";
import { toast } from "react-toastify";
import { PlusCircle, ClipboardEdit, FileSearch, MoreHorizontal } from "lucide-react"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Task } from '@/components/tasks/data/schema';
import { DataTableColumnHeader, DataTableColumnHeaderFilter } from '@/components/tasks/component/data-table-column-header';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function Index() {
    const [state, dispatch] = useReducer(reducer, { data: [] });
    const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm();
    const [textBox, setTextBox] = useState<string>('');
    const [filterInner, setFilterInner] = useState<boolean>(false);
    const [filterOut, setFilterOut] = useState<boolean>(false);
    const [PackUpdate, setPackUpdate] = useState<any>();
    const [count, setCount] = useState<number>(0);


    const fetchdataItem = async () => {
        const data = await Fetch_set_carton_box();
        const dataPack = await Fetch_pack();
        dispatch({ type: 'SET_DATA', payload: data });
        dispatch({ type: 'SET_DATA_PACK', payload: dataPack });

    };

    const handleOpanActions = (value: string) => {
        reset();
        clearErrors();
        setFilterInner(false);
        setFilterOut(false);
        dispatch({ type: 'SET_INNER_BOX', payload: null });
        dispatch({ type: 'SET_OUT_BOX', payload: null });
        dispatch({ type: 'SET_COL_REQUIRED', payload: value === 'pack' ? columnRequiredPack : columnRequiredSetBox });
    };

    const handleCancelActions = () => {
        setCount(0);
        dispatch({ type: 'SET_COL_REQUIRED', payload: null });
        setPackUpdate({});
    };

    useEffect(() => {
        fetchdataItem();
    }, []);

    const handleUpdate = (value: any) => {
        if (count === 0) {
            setCount(1)
            setPackUpdate(value)
            let resultInner: any[] = state.data.filter((item: any) => item.id === value?.inner_box ? value.inner_box : null);
            let resultOut: any[] = state.data.filter((item: any) => item.id === value?.package_carton ? value.package_carton : null);
            dispatch({ type: 'SET_INNER_BOX', payload: resultInner });
            dispatch({ type: 'SET_OUT_BOX', payload: resultOut });
        }
    }

    const handleFilterItemBox = (value: string) => {
        let result: any[] = state.data.filter((item: any) => item.id === textBox);
        if (value === 'inner' && textBox !== '') {
            if (result.length === 0) {
                setFilterInner(true);
                dispatch({ type: 'SET_INNER_BOX', payload: null });
                setTextBox('');
            }
            else {
                setFilterInner(false);
                dispatch({ type: 'SET_INNER_BOX', payload: result });
                setTextBox('');
            }
        }
        else if (value === 'out' && textBox !== '') {
            if (result.length === 0) {
                setFilterOut(true);
                dispatch({ type: 'SET_OUT_BOX', payload: null });
                setTextBox('');
            }
            else {
                setFilterOut(false);
                dispatch({ type: 'SET_OUT_BOX', payload: result });
                setTextBox('');
            }
        }
    };

    const handleFilter = (value: string) => {
        dispatch({ type: 'FILTER_DATA', payload: value });
    };

    const uplodeFile = async (value: any) => {
        let resultDocx = value.docx_pack.length === 0 ? 'pass' : await UploadStoragePack(value);
        let resultDocxwi = value.docx_wi.length === 0 ? 'pass' : await UploadStorageWI(value);
        if (resultDocx === 'pass' && resultDocxwi === 'pass') {
            return 'pass';
        }
        else if (resultDocx === 'The resource already exists') {
            return 'ชื่อไฟล์ document PI ซ้ำกรุณาเปลี่ยน ';
        }
        else if (resultDocxwi === 'The resource already exists') {
            return 'ชื่อไฟล์ซ้ำ document WI กรุณาเปลี่ยน';
        }
        else {
            return 'อาจมีปัญหากับ sever';
        }
    };

    const onSubmit: SubmitHandler<any> = async (data) => {
        let resultDocx = await uplodeFile(data);
        if (resultDocx === 'pass') {
            let result_size = await handleSetCraton(data);
            if (result_size === 'pass') {
                let result_pack = await Insertpack_std(data);
                result_pack === 'pass' ? toast.success('เพิ่มข้อมูลสำเร็จ', CustomToastContainer()) :
                    toast.error(result_pack, CustomToastContainer());
                fetchdataItem();
                reset();
                clearErrors();
                setFilterInner(false);
                setFilterOut(false);
                dispatch({ type: 'SET_INNER_BOX', payload: null });
                dispatch({ type: 'SET_OUT_BOX', payload: null });
            }
            else {
                toast.error(result_size, CustomToastContainer());
            }
        }
        else{
            toast.error(resultDocx, CustomToastContainer());
        }
    };

    const onSubmitPack: SubmitHandler<any> = async (data) => {
        let resultDocx = await uplodeFile(data);
        if (resultDocx === 'pass') {
            let result_size = await handleSetCraton(data);
            if (result_size === 'pass') {
                let result = {
                    master_item_box: data.master_item_box,
                    id_pack: PackUpdate.id_pack,
                    inner_box: data.inner_box,
                    pack_qty_inner: data.pack_qty_inner,
                    package_carton: data.package_carton,
                    pack_qty_package: data.pack_qty_package,
                    lamp_n_w: data.lamp_n_w,
                    plate_weight: data.plate_weight,
                    buffer: data.buffer,
                    buffer_mtl_weight: data.buffer_mtl_weight,
                    carton_n_w: data.carton_n_w,
                    g_w: data.g_w,
                    cubic: data.cubic,
                    docx_pack: data.docx_pack[0] ? data.docx_pack[0].name : PackUpdate.docx_pack ? PackUpdate.docx_pack : null,
                    docx_wi: data.docx_wi[0] ? data.docx_wi[0].name : PackUpdate.docx_wi ? PackUpdate.docx_wi : null,
                    statusrpa1_4_11_8: 'default'
                }
                let result_pack = await UpdatePackSTD(result);
                if (result_pack === 'pass') {
                    toast.success('เพิ่มข้อมูลสำเร็จ', CustomToastContainer());
                    dispatch({ type: 'SET_INNER_BOX', payload: null });
                    dispatch({ type: 'SET_OUT_BOX', payload: null });
                    clearErrors();
                    fetchdataItem();
                    setFilterInner(false);
                    setFilterOut(false);
                    setPackUpdate({});
                    reset();
                }
                else {
                    toast.error(result_pack, CustomToastContainer());
                }
            }
            else {
                toast.error(result_size, CustomToastContainer());
            }
        }
        else if (resultDocx === 'The resource already exists') {
            toast.error('ชื่อไฟล์ซ้ำกรุณาเปลี่ยน', CustomToastContainer());
        }

    };

    const onSubmitUpdateSizeBox: SubmitHandler<any> = async (data) => {
        console.log('onSubmitUpdateSizeBox => ', data);
        let result = await UpdateBoxSize(data);
        if (result === 'pass') {
            toast.success('อัพเดทข้อมูลสำเร็จ', CustomToastContainer());
            reset();
            clearErrors();
            dispatch({ type: 'SET_INNER_BOX', payload: null });
            fetchdataItem();
        }
        else {
            toast.error(result, CustomToastContainer());
        }
    };

    const handleSetCraton = async (data: any) => {
        let itemOut = data.idOut ?
            [{
                id: data.idOut,
                box_type: data.box_typeOut ?? null,
                paper_type: data.paper_typeOut ?? null,
                height: data.heightOut ?? null,
                width: data.widthOut ?? null,
                length: data.lengthOut ?? null,
                um_carton: data.um_cartonOut ?? null,
                statusrpa1_4_11_21: 'default'
            }]
            : []
        let itemInner = data.idInner ?
            [{
                id: data.idInner,
                box_type: data.box_typeInner ?? null,
                paper_type: data.paper_typeInner ?? null,
                height: data.heightInner ?? null,
                width: data.widthInner ?? null,
                length: data.lengthInner ?? null,
                um_carton: data.um_cartonInner ?? null,
                statusrpa1_4_11_21: 'default'
            }]
            : []
        let sum = [...itemOut, ...itemInner];
        let result = sum.length === 0 ? 'pass' : await InsertSet_carton_box(sum);
        return result;
    }

    const handleEditPack = () => {
        return (
            <>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='bg-yellow-500' onClick={() => handleOpanActions('pack')}>Edit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='max-w-4xl'>
                        <form onSubmit={handleSubmit(onSubmitPack)} className='w-full md:col-start-2 md:col-end-12 col-start-1 col-end-13'>
                            <AlertDialogHeader className='mb-4'>
                                <AlertDialogTitle>Update Packing</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4'>
                                <div>
                                    <Label className={`ml-2 ${errors.master_item_box ? 'text-red-600' : ''}`}>Master</Label>
                                    <Input
                                        type='text'
                                        placeholder={`Enter Master`}
                                        defaultValue={PackUpdate?.master_item_box ? PackUpdate.master_item_box : null}
                                        {...register('master_item_box', { required: state.colRequired?.includes('master_item_box') })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                        }}
                                    />
                                    <Label className='ml-2 text-gray-400'>กรุณากรอกข้อมูลช่องนี้</Label>
                                    {errors.master_item_box && <p className="whitespace-nowrap text-sm text-red-600" >Please select a Master.</p>}
                                </div>
                                <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />

                                <div className='col-start-1 col-end-2 '>
                                    <Label className={`ml-2 ${errors.inner_box ? 'text-red-600' : ''}`}>Inner box</Label>
                                    <Input
                                        type='text'
                                        placeholder={`Enter inner box`}
                                        defaultValue={PackUpdate?.inner_box ? PackUpdate.inner_box : null}
                                        {...register('inner_box', { required: state.colRequired?.includes('inner_box') })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                            setTextBox(inputElement.value)
                                        }}
                                        onBlur={() => handleFilterItemBox('inner')}
                                    />
                                    {errors.inner_box && <p className="whitespace-nowrap text-sm text-red-600" >Please select an Inner box.</p>}
                                </div>
                                <div>
                                    <Label className={`ml-2 ${errors.pack_qty_inner ? 'text-red-600' : ''}`}>pack qty</Label>
                                    <Input
                                        type='number'
                                        placeholder={`Enter pack qty`}
                                        defaultValue={PackUpdate?.pack_qty_inner ? PackUpdate.pack_qty_inner : null}
                                        step="0.0001"
                                        {...register('pack_qty_inner', { required: state.colRequired?.includes('pack_qty_inner') })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                        }}
                                    />
                                    {errors.pack_qty_inner && <p className="whitespace-nowrap text-sm text-red-600" >Please select a pack qty.</p>}
                                </div>
                                {state.dataInner ?
                                    <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
                                            <div className='lg:col-span-1 col-span-2'>
                                                <Label className='ml-2'>Size(L*W*H)</Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center whitespace-nowrap truncate">
                                                    {state.dataInner[0]?.length ? state.dataInner[0].length : null} *
                                                    {state.dataInner[0]?.width ? state.dataInner[0].width : null} *
                                                    {state.dataInner[0]?.height ? state.dataInner[0].height : null}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className='ml-2'>cubic box </Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                    <Label>  {state.dataInner[0]?.cubic_foot ? state.dataInner[0].cubic_foot : 0}</Label>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className='ml-2'>um_carton </Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                    <Label>  {state.dataInner[0]?.um_carton ? state.dataInner[0].um_carton : 0}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }
                                {filterInner ?
                                    <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                        <div className='grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 gap-2'>
                                            {inputSizeInner.map((item: any, index: number) => {
                                                return (
                                                    <div key={index}>
                                                        <Label className={`ml-2`}>{item.desc}</Label>
                                                        <Input
                                                            type={`${item.inputtype}`}
                                                            placeholder={`Enter ${item.desc}`}
                                                            step="0.0001"
                                                            {...register(item.name_input)}
                                                            onInput={(e) => {
                                                                const inputElement = e.target as HTMLInputElement;
                                                                const trimmedValue = inputElement.value.trim();
                                                                inputElement.value = trimmedValue.toUpperCase();
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div></div> : null}
                                <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                <div className='col-start-1 col-end-2 '>
                                    <Label className={`ml-2 ${errors.package_carton ? 'text-red-600' : ''}`}>package carton</Label>
                                    <Input
                                        type='text'
                                        placeholder={`Enter package carton`}
                                        defaultValue={PackUpdate?.package_carton ? PackUpdate.package_carton : null}
                                        step="0.0001"
                                        {...register('package_carton', { required: state.colRequired?.includes('package_carton') })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                            setTextBox(inputElement.value)
                                        }}
                                        onBlur={() => handleFilterItemBox('out')}
                                    />
                                    {errors.package_carton && <p className="whitespace-nowrap text-sm text-red-600" >Please select an Inner box.</p>}
                                </div>
                                <div>
                                    <Label className={`ml-2 ${errors.pack_qty_package ? 'text-red-600' : ''}`}>pack qty</Label>
                                    <Input
                                        type='number'
                                        placeholder={`Enter pack qty`}
                                        defaultValue={PackUpdate?.pack_qty_package ? PackUpdate.pack_qty_package : null}
                                        step="0.0001"
                                        {...register('pack_qty_package', { required: state.colRequired?.includes('pack_qty_package') })}
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const trimmedValue = inputElement.value.trim();
                                            inputElement.value = trimmedValue.toUpperCase();
                                        }}
                                    />
                                    {errors.pack_qty_package && <p className="whitespace-nowrap text-sm text-red-600" >Please select a pack qty.</p>}
                                </div>
                                {state.dataOut ?
                                    <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
                                            <div className='lg:col-span-1 col-span-2'>
                                                <Label className='ml-2'>size(L*W*H)</Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center whitespace-nowrap truncate">
                                                    {state.dataOut[0]?.length ? state.dataOut[0].length : null} *
                                                    {state.dataOut[0]?.width ? state.dataOut[0].width : null} *
                                                    {state.dataOut[0]?.height ? state.dataOut[0].height : null}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className='ml-2'>cubic box </Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                    <Label>  {state.dataOut[0]?.cubic_foot ? state.dataOut[0].cubic_foot : 0}</Label>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className='ml-2'>um_carton </Label>
                                                <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center ">
                                                    <Label>  {state.dataOut[0]?.um_carton ? state.dataOut[0].um_carton : 0}</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }
                                {filterOut ?
                                    <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                        <div className='grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 gap-4'>
                                            {inputSizeOut.map((item: any, index: number) => {
                                                return (
                                                    <div key={index}>
                                                        <Label className={`ml-2 ${errors.inner_box ? 'text-red-600' : ''}`}>{item.desc}</Label>
                                                        <Input
                                                            type={`${item.inputtype}`}
                                                            placeholder={`Enter ${item.desc}`}
                                                            step="0.0001"
                                                            {...register(item.name_input)}
                                                            onInput={(e) => {
                                                                const inputElement = e.target as HTMLInputElement;
                                                                const trimmedValue = inputElement.value.trim();
                                                                inputElement.value = trimmedValue.toUpperCase();
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div> </div> : null}
                                <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                {inputSTD.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <Label className={`ml-2 ${errors[item.name_input] ? 'text-red-600' : ''}`}>{item.desc}</Label>
                                            <Input
                                                type={`${item.inputtype}`}
                                                step="0.0001"
                                                defaultValue={PackUpdate ? PackUpdate[item.name_input] : null}
                                                placeholder={`Enter ${item.desc}`}
                                                {...register(`${item.name_input}`, { required: state.colRequired?.includes(`${item.name_input}`) })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                }}
                                            />
                                            {errors[item.name_input] && <p className="whitespace-nowrap text-sm text-red-600" >Please select {item.desc}.</p>}
                                        </div>
                                    )
                                })}
                                <div>
                                    <Label className={`ml-2`}>document</Label>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 col-span-3 relative">
                                        <Label htmlFor="picture" className="absolute text-white bg-gray-800 h-full w-24 rounded-l-lg pl-5 pt-3 cursor-pointer" >เลือกไฟล์</Label>
                                        <Input id="picture" type="file" className="cursor-pointer"  {...register('docx_pack')} />
                                    </div>
                                </div>
                                <div>
                                            <Label className={`ml-2`}>document WI</Label>
                                            <div className="grid w-full max-w-sm items-center gap-1.5 col-span-3 relative">
                                                <Label htmlFor="picture" className="absolute text-white bg-gray-800 h-full w-24 rounded-l-lg pl-5 pt-3 cursor-pointer" >เลือกไฟล์</Label>
                                                <Input id="picture" type="file" className="cursor-pointer"  {...register('docx_wi')} />
                                            </div>
                                        </div>
                                <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={() => handleCancelActions()}
                                    className='px-10'
                                    style={{ backgroundColor: '#ff0000' }}
                                >
                                    ออก
                                </AlertDialogCancel>
                                <Button
                                    type='submit'
                                    style={{ backgroundColor: '#28D39A' }}
                                    className='px-10'
                                >
                                    ยืนยัน
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        )
    };

    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-11/12'>
                <div className="flex items-center justify-between space-y-2 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Packing & set Carton Box</h2>
                        <p className="text-muted-foreground">
                            1.4.11.21
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" onClick={() => handleOpanActions('box')}><ClipboardEdit className='mr-2' /> Edit Size Box</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Update Box Size</AlertDialogTitle>
                                </AlertDialogHeader>
                                <form onSubmit={handleSubmit(onSubmitUpdateSizeBox)} className='grid gap-2'>
                                    <div>
                                        <Label className={`ml-2 ${errors.id ? 'text-red-600' : ''}`}>item number</Label>
                                        <Input
                                            type='text'
                                            placeholder={`Enter item number`}
                                            step="0.0001"
                                            {...register('id', { required: state.colRequired?.includes('id') })}
                                            onInput={(e) => {
                                                const inputElement = e.target as HTMLInputElement;
                                                const trimmedValue = inputElement.value.trim();
                                                inputElement.value = trimmedValue.toUpperCase();
                                                setTextBox(inputElement.value)
                                            }}
                                            onBlur={() => handleFilterItemBox('inner')}
                                        />
                                    </div>

                                    {inputSizeBox.map((item: any, index: number) => {

                                        return (
                                            <div key={index}>
                                                <Label className={`ml-2 ${errors[item.name_input] ? 'text-red-600' : ''}`}>{item.desc}</Label>
                                                <Input
                                                    type={item.inputtype}
                                                    placeholder={`Enter ${item.desc}`}
                                                    defaultValue={state.dataInner ? state.dataInner[0][item.name_input] : null}
                                                    step="0.0001"
                                                    disabled={state.dataInner ? false : true}
                                                    {...register(item.name_input, { required: state.colRequired?.includes(item.name_input) })}
                                                    onInput={(e) => {
                                                        const inputElement = e.target as HTMLInputElement;
                                                        const trimmedValue = inputElement.value.trim();
                                                        inputElement.value = trimmedValue.toUpperCase();
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                    <Separator className='my-2' />
                                    <AlertDialogFooter >
                                        <AlertDialogCancel
                                            type='button'
                                            style={{ backgroundColor: '#ff0000' }}
                                            className='px-10'
                                            onClick={() => handleCancelActions()}
                                        >
                                            ออก
                                        </AlertDialogCancel>

                                        <Button
                                            type='submit'
                                            style={{ backgroundColor: '#28D39A' }}
                                            className='px-10'
                                        >
                                            ยืนยัน
                                        </Button>
                                    </AlertDialogFooter>

                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    id='1'
                                    variant="outline"
                                    onClick={() => handleOpanActions('pack')}
                                >
                                    <PlusCircle className='mr-2' />
                                    Add Packing
                                </Button>
                            </SheetTrigger>
                            <SheetContent id='1' side='top' className='grid grid-cols-12 overflow-y-auto' style={{ height: '100%' }}>
                                <SheetHeader className='w-full md:col-start-2 md:col-end-12 col-start-1 col-end-13'>
                                    <SheetTitle>Packing STD</SheetTitle>
                                </SheetHeader>
                                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:col-start-2 md:col-end-12 col-start-1 col-end-13'>
                                    <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4'>
                                        <div>
                                            <Label className={`ml-2 ${errors.master_item_box ? 'text-red-600' : ''}`}>Master</Label>
                                            <Input
                                                type='text'
                                                placeholder={`Enter Master`}
                                                {...register('master_item_box', { required: state.colRequired?.includes('master_item_box') })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                }}
                                            />
                                            <Label className='ml-2 text-gray-400'>กรุณากรอกข้อมูลช่องนี้</Label>
                                            {errors.master_item_box && <p className="whitespace-nowrap text-sm text-red-600" >Please select a Master.</p>}
                                        </div>
                                        <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                        <div className='col-start-1 col-end-2 '>
                                            <Label className={`ml-2 ${errors.inner_box ? 'text-red-600' : ''}`}>Inner box</Label>
                                            <Input
                                                type='text'
                                                placeholder={`Enter inner box`}
                                                {...register('inner_box', { required: state.colRequired?.includes('inner_box') })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                    setTextBox(inputElement.value)
                                                }}
                                                onBlur={() => handleFilterItemBox('inner')}
                                            />
                                            {errors.inner_box && <p className="whitespace-nowrap text-sm text-red-600" >Please select an Inner box.</p>}
                                        </div>
                                        <div>
                                            <Label className={`ml-2 ${errors.pack_qty_inner ? 'text-red-600' : ''}`}>pack qty</Label>
                                            <Input
                                                type='number'
                                                placeholder={`Enter pack qty`}
                                                step="0.0001"
                                                {...register('pack_qty_inner', { required: state.colRequired?.includes('pack_qty_inner') })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                }}
                                            />
                                            {errors.pack_qty_inner && <p className="whitespace-nowrap text-sm text-red-600" >Please select a pack qty.</p>}
                                        </div>
                                        {state.dataInner ?
                                            <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                                <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4'>
                                                    <div>
                                                        <Label className='ml-2'>Size(L*W*H)</Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center whitespace-nowrap truncate">
                                                            {state.dataInner[0]?.length ? state.dataInner[0].length : null} *
                                                            {state.dataInner[0]?.width ? state.dataInner[0].width : null} *
                                                            {state.dataInner[0]?.height ? state.dataInner[0].height : null}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className='ml-2'>cubic box </Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                            <Label>  {state.dataInner[0]?.cubic_foot ? state.dataInner[0].cubic_foot : 0}</Label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className='ml-2'>um_carton </Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                            <Label>  {state.dataInner[0]?.um_carton ? state.dataInner[0].um_carton : 0}</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                        {filterInner ?
                                            <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                                <div className='grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 gap-2'>

                                                    {inputSizeInner.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index}>
                                                                <Label className={`ml-2`}>{item.desc}</Label>
                                                                <Input
                                                                    type={`${item.inputtype}`}
                                                                    placeholder={`Enter ${item.desc}`}
                                                                    step="0.0001"
                                                                    {...register(item.name_input)}
                                                                    onInput={(e) => {
                                                                        const inputElement = e.target as HTMLInputElement;
                                                                        const trimmedValue = inputElement.value.trim();
                                                                        inputElement.value = trimmedValue.toUpperCase();
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div></div> : null}
                                        <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                        <div className='col-start-1 col-end-2 '>
                                            <Label className={`ml-2 ${errors.package_carton ? 'text-red-600' : ''}`}>package carton</Label>
                                            <Input
                                                type='text'
                                                placeholder={`Enter package carton`}
                                                step="0.0001"
                                                {...register('package_carton', { required: state.colRequired?.includes('package_carton') })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                    setTextBox(inputElement.value)
                                                }}
                                                onBlur={() => handleFilterItemBox('out')}
                                            />
                                            {errors.package_carton && <p className="whitespace-nowrap text-sm text-red-600" >Please select an Inner box.</p>}
                                        </div>
                                        <div>
                                            <Label className={`ml-2 ${errors.pack_qty_package ? 'text-red-600' : ''}`}>pack qty</Label>
                                            <Input
                                                type='number'
                                                placeholder={`Enter pack qty`}
                                                step="0.0001"
                                                {...register('pack_qty_package', { required: state.colRequired?.includes('pack_qty_package') })}
                                                onInput={(e) => {
                                                    const inputElement = e.target as HTMLInputElement;
                                                    const trimmedValue = inputElement.value.trim();
                                                    inputElement.value = trimmedValue.toUpperCase();
                                                }}
                                            />
                                            {errors.pack_qty_package && <p className="whitespace-nowrap text-sm text-red-600" >Please select a pack qty.</p>}
                                        </div>
                                        {state.dataOut ?
                                            <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                                <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4'>
                                                    <div className='2xl:col-span-1 col-span-2 '>
                                                        <Label className='ml-2'>size(L*W*H)</Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center whitespace-nowrap truncate">
                                                            {state.dataOut[0]?.length ? state.dataOut[0].length : null} *
                                                            {state.dataOut[0]?.width ? state.dataOut[0].width : null} *
                                                            {state.dataOut[0]?.height ? state.dataOut[0].height : null}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className='ml-2'>cubic box </Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center">
                                                            <Label>  {state.dataOut[0]?.cubic_foot ? state.dataOut[0].cubic_foot : 0}</Label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className='ml-2'>um_carton </Label>
                                                        <div className="rounded-md border border-blue-500 px-4 h-10 font-mono flex items-center ">
                                                            <Label>  {state.dataOut[0]?.um_carton ? state.dataOut[0].um_carton : 0}</Label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            : null
                                        }
                                        {filterOut ?
                                            <div className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3'>
                                                <div className='grid lg:grid-cols-7 md:grid-cols-5 grid-cols-3 gap-4'>
                                                    {inputSizeOut.map((item: any, index: number) => {
                                                        return (
                                                            <div key={index}>
                                                                <Label className={`ml-2 ${errors.inner_box ? 'text-red-600' : ''}`}>{item.desc}</Label>
                                                                <Input
                                                                    type={`${item.inputtype}`}
                                                                    placeholder={`Enter ${item.desc}`}
                                                                    step="0.0001"
                                                                    {...register(item.name_input)}
                                                                    onInput={(e) => {
                                                                        const inputElement = e.target as HTMLInputElement;
                                                                        const trimmedValue = inputElement.value.trim();
                                                                        inputElement.value = trimmedValue.toUpperCase();
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div> </div> : null}
                                        <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                        {inputSTD.map((item: any, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <Label className={`ml-2 ${errors[item.name_input] ? 'text-red-600' : ''}`}>{item.desc}</Label>
                                                    <Input
                                                        type={`${item.inputtype}`}
                                                        step="0.0001"
                                                        placeholder={`Enter ${item.desc}`}
                                                        {...register(`${item.name_input}`, { required: state.colRequired?.includes(`${item.name_input}`) })}
                                                        onInput={(e) => {
                                                            const inputElement = e.target as HTMLInputElement;
                                                            const trimmedValue = inputElement.value.trim();
                                                            inputElement.value = trimmedValue.toUpperCase();
                                                        }}
                                                    />
                                                    {errors[item.name_input] && <p className="whitespace-nowrap text-sm text-red-600" >Please select {item.desc}.</p>}
                                                </div>
                                            )
                                        })}

                                        <div>
                                            <Label className={`ml-2`}>document PI</Label>
                                            <div className="grid w-full max-w-sm items-center gap-1.5 col-span-3 relative">
                                                <Label htmlFor="picture" className="absolute text-white bg-gray-800 h-full w-24 rounded-l-lg pl-5 pt-3 cursor-pointer" >เลือกไฟล์</Label>
                                                <Input id="picture" type="file" className="cursor-pointer"  {...register('docx_pack')} />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className={`ml-2`}>document WI</Label>
                                            <div className="grid w-full max-w-sm items-center gap-1.5 col-span-3 relative">
                                                <Label htmlFor="picture" className="absolute text-white bg-gray-800 h-full w-24 rounded-l-lg pl-5 pt-3 cursor-pointer" >เลือกไฟล์</Label>
                                                <Input id="picture" type="file" className="cursor-pointer"  {...register('docx_wi')} />
                                            </div>
                                        </div>
                                        <Separator className='col-start-1 lg:col-end-6 md:col-end-5 col-end-3 h-0.5 mb-2' />
                                    </div>
                                    <SheetFooter className='flex justify-center mt-6'>
                                        <SheetClose asChild>
                                            <Button
                                                type='button'
                                                style={{ backgroundColor: '#ff0000' }}
                                                className='px-10'
                                                onClick={() => handleCancelActions()}
                                            >
                                                ออก
                                            </Button>
                                        </SheetClose>
                                        <Button
                                            type='submit'
                                            style={{ backgroundColor: '#28D39A' }}
                                            className='px-10'
                                        >
                                            ยืนยัน
                                        </Button>
                                    </SheetFooter>
                                </form>

                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <DataTable columns={columnPackSTD} data={state.dataFilter ? state.dataFilter : []} handleFilter={handleFilter} handleEditPack={handleEditPack} handleUpdate={handleUpdate} />
            </div>
        </div>
    );
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload };
        case 'SET_DATA_PACK':
            return { ...state, dataPack: action.payload, dataFilter: action.payload };
        case 'FILTER_DATA':
            const searchTerm = action.payload;
            let filteredData = state.dataPack.filter((object: any) => {
                const objectValues = Object.values(object).join(' ');
                return objectValues.toLowerCase().search(searchTerm.toLowerCase()) !== -1;

            });
            return {
                ...state,
                dataFilter: searchTerm ? filteredData : state.dataPack,
            };
        case 'SET_INNER_BOX':
            return { ...state, dataInner: action.payload };
        case 'SET_OUT_BOX':
            return { ...state, dataOut: action.payload };
        case 'SET_COL_REQUIRED':
            return { ...state, colRequired: action.payload };
        default:
            return state;
    }
};


const inputSizeInner = [
    { name_input: 'idInner', inputtype: 'text', desc: 'item number' },
    { name_input: 'box_typeInner', inputtype: 'text', desc: 'box type' },
    { name_input: 'paper_typeInner', inputtype: 'text', desc: 'paper type' },
    { name_input: 'heightInner', inputtype: 'number', desc: 'height' },
    { name_input: 'widthInner', inputtype: 'number', desc: 'width' },
    { name_input: 'lengthInner', inputtype: 'number', desc: 'length' },
    { name_input: 'um_cartonInner', inputtype: 'text', desc: 'unit' }
];
const inputSizeOut = [
    { name_input: 'idOut', inputtype: 'text', desc: 'item number' },
    { name_input: 'box_typeOut', inputtype: 'text', desc: 'box type' },
    { name_input: 'paper_typeOut', inputtype: 'text', desc: 'paper type' },
    { name_input: 'heightOut', inputtype: 'number', desc: 'height' },
    { name_input: 'widthOut', inputtype: 'number', desc: 'width' },
    { name_input: 'lengthOut', inputtype: 'number', desc: 'length' },
    { name_input: 'um_cartonOut', inputtype: 'text', desc: 'unit' }
];

const inputSTD = [
    { name_input: 'lamp_n_w', inputtype: 'number', desc: 'lamp N.W.' },
    { name_input: 'plate_weight', inputtype: 'number', desc: 'plate weighte' },
    { name_input: 'buffer', inputtype: 'text', desc: 'buffer' },
    { name_input: 'buffer_mtl_weight', inputtype: 'number', desc: 'buffer mtl weight' },
    { name_input: 'carton_n_w', inputtype: 'number', desc: 'carton/N.W.' },
    { name_input: 'g_w', inputtype: 'number', desc: 'G.W.' },
    { name_input: 'cubic', inputtype: 'number', desc: 'cubic' }
];

const inputSizeBox = [
    { name_input: 'box_type', inputtype: 'text', desc: 'box type' },
    { name_input: 'paper_type', inputtype: 'text', desc: 'paper type' },
    { name_input: 'height', inputtype: 'number', desc: 'height' },
    { name_input: 'width', inputtype: 'number', desc: 'width' },
    { name_input: 'length', inputtype: 'number', desc: 'length' },
    { name_input: 'um_carton', inputtype: 'text', desc: 'unit' }
];

const columnRequiredPack: string[] = [
    'master_item_box',
    'inner_box',
    'pack_qty_inner',
    'package_carton',
    'pack_qty_package',
    'lamp_n_w',
    'plate_weight',
    'buffer',
    'buffer_mtl_weight',
    'carton_n_w',
    'g_w',
    'cubic'
];

const columnRequiredSetBox: string[] = [
    'id',
    'box_type',
    'paper_type',
    'height',
    'width',
    'length',
    'cubic_foot',
    'um_carton'
];

//20-c415-05-2