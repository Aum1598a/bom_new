'use client'
import { supabase } from '../supabase/supabaseConnect';
import { CustomToastContainer } from '@/components/functions';
import { ToastContainer, toast } from "react-toastify";

export const InsertNewModel = async (props: { dataNewModel: any[], dataMaster: any[] }) => {
    const { dataNewModel, dataMaster } = props;
    let { data, error } = await supabase
        .rpc('insert_bom_new_model', {
            data: dataNewModel,
            datamaster: dataMaster
        })

    if (error) console.error(error)
    else {
        console.log('insert_bom_new_model', data);
        toast.success("คีข้อมูลเสร็จสิ้น", CustomToastContainer());
        setTimeout(() => {
            window.location.reload();
        }, 1100);
    }
};

export const InsertReviseModel = async (dataInsertECO: any) => {
    const { data, error } = await supabase
        .from('revise_bom')
        .insert(dataInsertECO)
        .select()
    if (error) {
        console.error('error InsertReviseModel => ', error.message);
        return 'error';
    }
    else {
        console.log('Success InsertreviseModel  => ', data);
        return 'pass';
    }
};

export const InsertReviseItemOBU = async (dataInsertRegister: any[]) => {
    const { data, error } = await supabase
        .from('registerbom')
        .insert(dataInsertRegister)
        .select()

    if (error) {
        console.error('error InsertReviseItemOBU => ', error.message);
        return 'error';
    }
    else {
        console.log('Success InsertReviseItemOBU => ', data);
        return 'pass';
    }
};

export const InsertBomdata_v1from = async (dataInsertBomdata_v1: any) => {
    console.log(dataInsertBomdata_v1);

    for (const key in dataInsertBomdata_v1) {
        if (dataInsertBomdata_v1.hasOwnProperty(key) && dataInsertBomdata_v1[key] === '') {
            dataInsertBomdata_v1[key] = null;
        }
    }

    const { data, error } = await supabase
        .from('bomdata_v1')
        .insert(dataInsertBomdata_v1)
        .select()
    if (error) {
        console.error('error InsertBomdata_v1from => ', error.message);
        return [];
    }
    else {
        console.log('Success InsertBomdata_v1from => ', data);
        return data;
    }
};

export const InsertRegisterbom = async (convertedItemReg: any[]) => {
    const { data, error } = await supabase
        .from('registerbom')
        .insert(convertedItemReg)
        .select()
    if (error) {
        console.error('error InsertRegisterbom => ', error.message);
        return 'error';
    }
    else {
        console.log('Success InsertRegisterbom => ', data);
        return 'pass';
    }
};

export const Insertitemtit = async (dataItemtit: any[]) => {
    if (dataItemtit.length === 0) {
        return 'pass';
    }
    const { data, error } = await supabase
        .from('itemtit')
        .insert(dataItemtit)
        .select()
    if (error) {
        console.error('error Insertitemtit => ', error.message);
        return 'error';
    }
    else {
        console.log('Success Insertitemtit => ', data);
        return 'pass';
    }
};

export const InsertitemtitForm = async (dataItemtit: any[]) => {
    const { data, error } = await supabase
        .from('itemtit')
        .insert(dataItemtit)
        .select()
    if (error) {
        console.error('error InsertitemtitForm => ', error.message);
        return 'error';
    }
    else {
        console.log('Success InsertitemtitForm => ', data);
        return data;
    }
};

export const InsertMasterItem = async (dataMasterItem: any[]) => {
    if (dataMasterItem.length === 0) {
        return 'pass';
    }
    const { data, error } = await supabase
        .from('masterItem')
        .insert(dataMasterItem)
        .select()
    if (error) {
        console.error('error InsertMasterItem => ', error.message);
        return 'error'
    }
    else {
        console.log('Success InsertMasterItem => ', data);
        return 'pass'
    }
};

export const InsertMasterItemdata = async (dataMasterItem: any[]) => {
    const { data, error } = await supabase
        .from('masterItem')
        .insert(dataMasterItem)
        .select()
    if (error) {
        console.error('error InsertMasterItemdata => ', error.message);
        return [];
    }
    else {
        console.log('Success InsertMasterItemdata => ', data);
        return data;
    }
};

export const InsertRevisDivision = async (dataInsertRevisDivision: any) => {
    console.log('dataInsertRevisDivision', dataInsertRevisDivision);

    const { data, error } = await supabase
        .from('revis_division')
        .insert(dataInsertRevisDivision)
        .select()
    if (error) {
        console.error('error InsertRevisDivision => ', error.message);
        return [];
    }
    else {
        console.log('Success InsertRevisDivision => ', data);
        return data;
    }
};

export const InsertWorktest = async (dataInsertWorktest: any[]) => {
    console.log('dataInsertWorktest', dataInsertWorktest);

    const { data, error } = await supabase
        .from('worktest')
        .insert(dataInsertWorktest)
        .select()
    if (error) {
        console.error('error InsertWorktest => ', error.message);
        return [];
    }
    else {
        console.log('Success InsertWorktest => ', data);
        return data || [];
    }
};

export const Insertbomdata_v2 = async (dataInsertbomdata_v2: any[]) => {
    const { data, error } = await supabase
        .from('bomdata_v2')
        .insert(dataInsertbomdata_v2)
        .select()

    if (error) {
        console.error('error Insertbomdata_v2 => ', error.message);
        return 'error'
    }
    else {
        console.log('Success Insertbomdata_v2 => ', data);
        return 'pass'
    }
};

export const InsertSet_carton_box = async (value: any[]) => {
    console.log(value);

    const { data, error } = await supabase
        .from('set_carton_box')
        .insert(value)
        .select()
    if (error) {
        console.error('error InsertSet_carton_box => ', error.message);
        return 'error'
    }
    else {
        console.log('Success InsertSet_carton_box => ');
        return 'pass'
    }
}


export const Insertpack_std = async (value: any) => {
    const { data, error } = await supabase
        .from('pack_std')
        .insert({
            id_pack: value.master_item_box ?? null,
            inner_box: value.inner_box ?? null,
            pack_qty_inner: value.pack_qty_inner ?? null,
            package_carton: value.package_carton ?? null,
            pack_qty_package: value.pack_qty_package ?? null,
            master_item_box: value.master_item_box ?? null,
            lamp_n_w: value.lamp_n_w ?? null,
            plate_weight: value.plate_weight ?? null,
            buffer: value.buffer ?? null,
            buffer_mtl_weight: value.buffer_mtl_weight ?? null,
            carton_n_w: value.carton_n_w ?? null,
            g_w: value.g_w ?? null,
            cubic: value.cubic ?? null,
            docx_pack: value?.docx_pack[0]?.name ?value.docx_pack[0].name: null,
            docx_wi: value?.docx_wi[0]?.name ?value.docx_wi[0].name: null,
            statusrpa1_4_11_8:'default'

        })
        .select()

    if (error) {
        console.error('error Insertpack_std => ', error.message);
        return 'error'
    }
    else {
        console.log('Success Insertpack_std => ');
        return 'pass'
    }
};

// {   id_pack : value.master_item_box ??null ,
//     inner_box : value.inner_box  ??null ,
//     pack_qty_inner : value.pack_qty_inner ??null ,
//     package_carton : value.package_carton ??null ,
//     pack_qty_package : value.pack_qty_package ??null ,
//     master_item_box : value.master_item_box ??null ,
//     lamp_n_w  : value.lamp_n_w ??null ,
//     plate_weight : value.plate_weight ??null ,
//     buffer : value.buffer ??null ,
//     buffer_mtl_weight: value.buffer_mtl_weight ??null ,
//     carton_n_w: value.carton_n_w ??null ,
//     g_w : value.g_w ??null ,
//     cubic : value.cubic ??null ,
//     docx_pack : value.docx_pack.docx_pack[0].name ?? null
// }

