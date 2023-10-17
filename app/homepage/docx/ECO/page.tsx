'use client'
import { columnsDocxECO } from '@/components/tasks/component/columns';
import { DataTableDocxECO } from '@/components/tasks/data-table';
import { FetchDocxRelation } from '@/supabase/fetchDataSB';
import { useEffect, useState, useReducer } from 'react';

export default function Index() {
    const [state, dispatch] = useReducer(reducer, { data: [] });//20-6578-A0-1N 11-6347-00-1N
    useEffect(() => {
        const fetchdataItem = async () => {
            const data = await FetchDocxRelation();
            dispatch({ type: 'SET_DATA', payload: data });
        };
        fetchdataItem();
    }, []);


    const handleonClick = async (value: string) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: value });

    };

    return (
        <div className='mt-4'>
            <DataTableDocxECO columns={columnsDocxECO} data={state.datafilter ? state.datafilter : []} handleonClick={handleonClick} />

        </div>
    );
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload, datafilter: action.payload };
        case 'SET_SEARCH_TERM':
            const searchTerm = action.payload;
            let filteredData = state.data.filter((object: any) => {
                const objectValues = Object.values(object).join(' ');
                return objectValues.toLowerCase().search(searchTerm.toLowerCase()) !== -1;

            });
            return {
                ...state,
                datafilter: searchTerm ? filteredData : state.data,
            };
        default:
            return state;
    }
};

