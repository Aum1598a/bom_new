'use client'
import { useEffect, useState, useReducer } from 'react';
import { FetchWorktestJoinBom } from '@/supabase/fetchDataSB';
import { UploadStorageWT } from '@/supabase/storage';
import { UpdateWorkTest } from '@/supabase/updateDataSB';
import { CustomToastContainer } from '@/components/functions';
import { toast } from 'react-toastify';
import { columnsendWT } from '@/components/tasks/component/columns';
import { DataTableSendWT } from '@/components/tasks/data-table';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface FilteredDataItem {
    item_number: string;
    id_worktest: string;
    order_date: any;
    status_worktest: string;
    date_test: any;
    status_test: string;
    docx_test: string;
    release: any;
    due: any;
    prod_area: string;
    prod_unit: string;

}

export default function Index() {
    const [state, dispatch] = useReducer(reducer, { data: [] });

    const [dataWorkTests, setDataWorkTest] = useState<FilteredDataItem[]>([]);

    const setPrimaryKeydate = () => {
        let dateMYMH = new Date();
        let date = dateMYMH.getDate(); let month = dateMYMH.getMonth() + 1; let year = dateMYMH.getFullYear();
        let dateTime: string = `${date.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}-`
        return dateTime;
    };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    console.log(formattedDate);
    
    useEffect(() => {
        fetchWTjoinBom();
    }, []);

    const fetchWTjoinBom = async () => {
        const dataFetch = await FetchWorktestJoinBom([]);
        dispatch({ type: 'SET_DATA', payload: dataFetch });
    };

    const handleFilter = (value: any) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: value });
    }
    const handleUpdateWT = async (value: any , valueFile: any) => {
        let resultFile = await UploadStorageWT(value);
        if (resultFile === 'pass') {
            let result = await UpdateWorkTest(value );
            if (result === 'pass') {
                toast.success('ส่งผล test เสร็จสิ้น', CustomToastContainer());
                fetchWTjoinBom();
            } else {
                toast.error('ส่งผล test ไม่เสร็จสิ้นอาจมีปัญหากับ server', CustomToastContainer());
            }
        }//The resource already exists
        else if (resultFile === 'The resource already exists') {
            toast.error('ชื่อไฟล์ซ้ำกรุณาเปลี่ยน', CustomToastContainer());
        }
    };
    //columns={columns} data={state.datafilter ? state.datafilter : []}
    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-11/12' >
                <DataTableSendWT columns={columnsendWT} data={state.datafilter ? state.datafilter : []} handleUpdateWT={handleUpdateWT} handleFilter={handleFilter} />
                {/* <Select onValueChange={(event)=>handleFilter(event)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
        </div>
    );
};


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: action.payload , datafilter: action.payload };
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