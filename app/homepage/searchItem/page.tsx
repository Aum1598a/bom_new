'use client'
import React, { useEffect, useState, useReducer } from 'react';
import { FetchSearchItem } from '@/supabase/fetchDataSB';
import { DataTable } from '@/components/tasks/data-table';
import { columns } from '@/components/tasks/component/columns';
export default function Index() {
    const [state, dispatch] = useReducer(reducer, { data: [] });//20-6578-A0-1N 11-6347-00-1N
    useEffect(() => {
        const fetchdataItem = async () => {
            const data = await FetchSearchItem();
            dispatch({ type: 'SET_DATA', payload: data });
        };
        fetchdataItem();
    }, []);

    const handleFilter = (value: string) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    }



    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-11/12' >
                <DataTable columns={columns} data={state.datafilter ? state.datafilter : []} handleFilter={handleFilter} />
            </div>

        </div>
    );
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            let search = action.payload.map((item:any) => ({...item, search:item.id_item?item.id_item:'' + item.um?item.um:'' + item.prod_line?item.prod_line:'' }))
            console.log(search);
            
            return { ...state, data: search , datafilter: action.payload };
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

interface DropdownColumn { column: string; columnName: string; };

const columnSearch: DropdownColumn[] = [
    { column: 'No', columnName: 'No' },
    { column: 'item_number', columnName: 'item number' },
    { column: 'um', columnName: 'unit' },
    { column: 'description', columnName: 'description' },
    { column: 'prod_line', columnName: 'prod line' },
    { column: 'item_type', columnName: 'item type' },
    { column: 'bom_release', columnName: 'bom release' },
    { column: 's_t', columnName: 'unit set' },
    { column: 'ecn_rev', columnName: 'ecn rev' },
    { column: 'suite_mold', columnName: 'suite mold' },
    { column: 'grouptit', columnName: 'group' },
    { column: 'size_l_w_h', columnName: 'size' },
    { column: 'oem_cust', columnName: 'oem cust' },
    { column: 'project', columnName: 'project' },
    { column: 'p_m', columnName: 'p&m' },
    { column: 'status_item', columnName: 'status item' },
    { column: 'usertit', columnName: 'user tit' }];

    // let data = [
    //     {
    //         asdf: 'log',
    //         asd: 'result'
    //     },
    //     {
    //         asdf: 'log',
    //         asd: 'results'
    //     }
    // ];
    
    // const searchTerm = 'result';
    
    // let results = data.filter((object) => {
    //     // ใช้ Object.values() เพื่อดึงค่าของทุกคีย์ในอ็อบเจ็กต์และรวมเป็นสตริงเดียว
    //     const objectValues = Object.values(object).join(' ');
    
    //     // ใช้ .search() เพื่อค้นหา searchTerm ใน objectValues
    //     return objectValues.toLowerCase().search(searchTerm) !== -1;
    // });
    
    // console.log(results);
    