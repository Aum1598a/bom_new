'use client'
import React, { useEffect, useState, useReducer } from 'react';
import { columnsBom } from '@/components/tasks/component/columns';
import { DataTableBom } from '@/components/tasks/data-table';
import { Fetchsearch_item_with_address, Fetchget_bom_new } from '@/supabase/fetchDataSB';

import { toast, ToastContainer } from 'react-toastify';
import { CustomToastContainer } from '@/components/functions';
import * as successData from '@/components/css/loading.json';

export default function Index() {
    const [state, dispatch] = useReducer(reducer, { data: [] });//20-6578-A0-1N 11-6347-00-1N
    const [textdata, setdata] = useState<any[]>([])
    const [textSearch, setTextSearch] = useState<string>('')
    const [loading, setLoading] = useState(true);
    const statusItem = new Set(['latest']);

    // let count:number = 0;
    useEffect(() => {
        const fetchdataItem = async () => {
            const data = await Fetchsearch_item_with_address();
            setdata(data)
            setLoading(false)
        };
        fetchdataItem();
    }, []);

    const handleonClick = async () => {

        let text = textdata.filter((item: any) => item.item_number === textSearch);
        if (text.length !== 0) {
            const data = await Fetchget_bom_new(text[0].master_item ? text[0].master_item : null);
            dispatch({ type: 'SET_DATA', payload: data });
            dispatch({ type: 'SET_SEARCH_TERM', payload: text[0].address ? text[0].address : '' });
        }
        else {
            toast.warning('ไม่มี bom นี้', CustomToastContainer());
        }
    }


    return (<>
        {loading === true ?
            null :
            <div className='flex justify-center mt-4 ' >
                <div className='w-11/12'>
                    <DataTableBom columns={columnsBom} data={state.datafilter ? state.datafilter : []} setTextSearch={setTextSearch} handleonClick={handleonClick} statusItem={statusItem} />
                </div>
            </div>}
    </>

    );
}
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload, datafilter: action.payload };
        case 'SET_SEARCH_TERM':
            const searchTerm = action.payload;
            const filteredData = state.data.filter((item: any) => item.address.search(searchTerm) === 0);
            return {
                ...state,
                datafilter: searchTerm ? filteredData : state.data,
            };
        default:
            return state;
    }
};


{/* <lottie-player src="https://lottie.host/7858175f-ec90-426d-afe8-be95cc548c0e/mosRpJsVhk.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player> */ }