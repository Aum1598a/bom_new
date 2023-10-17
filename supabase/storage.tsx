'use client'
import { supabase } from './supabaseConnect';

export const UploadStorage = async (imgFile: File, nameFile: string) => {
    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .upload(`doc_eco/${nameFile}`, imgFile, {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error('error UploadStorage => ', error.message);
    }
    else {
        console.log('Succeeded UploadStorage => ', data);
    }
};

export const UploadStorageWT = async (valueFile: any) => {
    console.log(valueFile);

    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .upload(`work_test/${valueFile.docx_test[0].name}`, valueFile.docx_test[0], {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error('error UploadStorageWT => ', error.message);
        return error.message;
    }
    else {
        console.log('Succeeded UploadStorageWT => ', data);
        return 'pass';
    }
};

export const UploadStoragePack = async (valueFile: any) => {
    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .upload(`docx_pack/${valueFile.docx_pack[0].name}`, valueFile.docx_pack[0], {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error('error UploadStoragePack => ', error.message);
        return error.message;
    }
    else {
        console.log('Succeeded UploadStoragePack => ', data);
        return 'pass';
    }
};

export const UploadStorageWI = async (valueFile: any) => {

    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .upload(`docx_wi/${valueFile.docx_wi[0].name}`, valueFile.docx_wi[0], {
            cacheControl: '3600',
            upsert: false
        })
    if (error) {
        console.error('error UploadStorageWT => ', error.message);
        return error.message;
    }
    else {
        console.log('Succeeded UploadStorageWT => ', data);
        return 'pass';
    }
};

export const CreateUrl = async (nameFile: string, folder: string) => {

    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .createSignedUrl(`${folder}/${nameFile}`, 60)
    if (error) {
        console.error('error CreateUrl => ', error.message);
        return error;
    }
    else {
        console.log('Succeeded CreateUrl => ', data.signedUrl);
        if (data && data.signedUrl) {
            window.open(data.signedUrl, '_blank');
        }
        return data;
    }
}

export const DownloadFile = async (nameFile: string) => {
    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .download(`doc_eco/${nameFile}`)
    if (error) {
        console.error('error DownloadFile => ', error.message);
    }
    else {
        console.log('Succeeded DownloadFile');
        const blob = new Blob([data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'avatar1.png'; // Set the desired file name
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

export const FetchFile = async () => {
    const { data, error } = await supabase
        .storage
        .from('imgbom')
        .list('work_test', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })
    if (error) {
        console.log('error FetchFile => ', error.message);

    }
    else {
        console.log('Succeeded FetchFile => ', data)
    }
}
