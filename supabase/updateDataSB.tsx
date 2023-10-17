'use client'
import { supabase } from '../supabase/supabaseConnect';

export const Updatebomdata_v2 = async (dataUpdateECO: any) => {
    const { data, error } = await supabase
        .from('bomdata_v2')
        .update({
            end_effective: dataUpdateECO.end_effective,
            remarks: dataUpdateECO.remarks,
            status_item: dataUpdateECO.status_item
        })
        .eq('trans', dataUpdateECO.trans)
        .select();
    if (error) {
        console.error('error Updatebomdata_v2 => ', error.message);
        return 'error';
    }
    else {
        console.log('Success Updatebomdata_v2 => ', data);
        return 'pass';
    }
};

export const UpdateWorkTest = async (value: any) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log([{ status_worktest: 'YES', docx_test: value.docx_test[0].name, date_test: formattedDate, status_test: value.status_test }]);

    const { data, error } = await supabase
        .from('worktest')
        .update([{ status_worktest: 'YES', docx_test: value.docx_test[0].name, date_test: formattedDate, status_test: value.status_test }])
        .eq('id_worktest', value.id_worktest)
        .select()

    if (error) {
        console.error('error Update worktest => ', error.message);
        return 'error';
    }
    else {
        console.log('Success Update worktest => ', data);
        return 'pass';
    }

}

export const UpdatePackSTD = async (value: any) => {
    const { data, error } = await supabase
        .from('pack_std')
        .update({
            master_item_box: value.master_item_box,
            inner_box: value.inner_box,
            pack_qty_inner: value.pack_qty_inner,
            package_carton: value.package_carton,
            pack_qty_package: value.pack_qty_package,
            lamp_n_w: value.lamp_n_w,
            plate_weight: value.plate_weight,
            buffer: value.buffer,
            buffer_mtl_weight: value.buffer_mtl_weight,
            carton_n_w: value.carton_n_w,
            g_w: value.g_w,
            cubic: value.cubic,
            docx_pack: value.docx_pack
        })
        .eq('id_pack', value.id_pack)
        .select('*')

    if (error) {
        console.error('error Update worktest => ', error.message);
        return 'error';
    }
    else {
        console.log('Success Update worktest => ', data);
        return 'pass';
    }

}

export const UpdateBoxSize = async (value: any) => {
    const { data, error } = await supabase
        .from('set_carton_box')
        .update({
            box_type: value.box_type ? value.box_type : null,
            paper_type: value.paper_type ? value.paper_type : null,
            height: value.height ? value.height : null,
            width: value.width ? value.width : null,
            length: value.length ? value.length : null,
            um_carton: value.um_carton ? value.um_carton : null,
            statusrpa1_4_11_21: 'default'
        })
        .eq('id', value.id)
        .select()

    if (error) {
        console.error('error Update worktest => ', error.message);
        return error.message;
    }
    else {
        console.log('Success Update worktest => ', data);
        return 'pass';
    }

}
