'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import { InsertRegisterbom, Insertitemtit, Insertbomdata_v2, InsertMasterItem } from "@/supabase/insertDataSB";
import { FetchFilterItem, FetchMasterItem,  FetchitemTIT } from '@/supabase/fetchDataSB';
import { toast } from "react-toastify";
import { CustomToastContainer } from "@/components/functions";
import { ExcelImport } from '@/components/functions'
import { TableCreate } from '@/components/template/tableCreate';
import { columninsertExcel } from '@/components/tasks/component/columns';
import { DataInsertExcel } from '@/components/tasks/data-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface user {
    username: string;
    division: string;
}

export default function Index() {
    const [excelData, setExcelData] = useState<any[]>([]);
    const [masterDescription, setMasterDescription] = useState<string>('');
    const [itemtit, setItemtit] = useState<any[]>([]);
    const [Rdddegister, setRegister] = useState<any[]>([]);
    const [dataMaster, setdataMaster] = useState<any[]>([]);
    const [databom, setdatabom] = useState<any[]>([]);
    let digit: any = [];
    let last_lev = 0;

    const handleLevelNumbers = (level: any) => {
        let lev = +level;
        lev = level == '0' ? 0 : lev;
        lev = level == '1' ? 1 : lev;
        if (lev === 0) {
            digit = [1];
        } else if (lev > last_lev) {
            digit.push(1);

        } else if (lev !== 0 && lev === last_lev) {
            digit[lev] += 1;

        } else if (lev < last_lev) {
            digit = digit.slice(0, lev + 1);
            digit[lev] += 1;
        }
        last_lev = lev;
        return digit.join('.');
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        ExcelImport(file, setExcelData);
    };

    const setPrimaryKeydate = () => {
        let dateMYMH = new Date();
        let date = dateMYMH.getDate(); let month = dateMYMH.getMonth() + 1; let year = dateMYMH.getFullYear();
        let minutes = dateMYMH.getMinutes(); let hours = dateMYMH.getHours();
        let dateTime: string = `${date.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}-${minutes.toString().padStart(2, '0')}${hours.toString().padStart(2, '0')}`
        return dateTime;
    };

    const handleUser = () => {
        return '1579'
    }

    const handleTodate = (date: string | undefined) => date ? `${date.split("/")[2]}-${date.split("/")[1]}-${date.split("/")[0]}` : null;

    useEffect(() => {
        if (excelData.length !== 0) {
            handledataBom_v1(excelData);
            handleItemtit(excelData);
            handleMasterItem(excelData);
            handleRegisterToObj(excelData);
        }

    }, [excelData]);

    const handledataBom_v1 = async (dataarr: any) => {
        const convertedItemReg: any[] = dataarr.slice(1).map((item: any, indax: number) => {
            let tran = handleLevelNumbers(item[2]);
            const id = item[0] + item[3] + tran;
            const obj: any = {
                trans: id,
                address: tran,
                master_item: item[0] ?? null,
                parent_item: item[1] ?? null,
                item_number: item[3] ?? null,
                level: item[2] ?? null,
                sequence_number: item[22] ?? null,
                boi_scrap: item[26] ?? null,
                process: item[25] ?? null,
                forecast: item[23] ?? null,
                lt_ofset: item[20] ?? null,
                usertit: handleUser(),
                start_effective: handleTodate(item[10]),
                qty_per: item[11] ?? null,
                op: item[21] ?? null,
                scrap: item[19] ?? null,
                option_group: item[24] ?? null,
                reference: item[18] ?? null,
                end_effective: handleTodate(item[27]),
                remarks: item[28] ?? null,
                status_item: 'latest'
            };
            return obj;
        });
        setdatabom(convertedItemReg)
    };

    const handleMasterItem = async (dataarr: any[]) => {
        const filterMaster: string[] = [];

        const convertedMaster: any[] = dataarr.slice(1).map((item: any) => {
            filterMaster.push(item[0]);
            const obj: any = {
                id_masterItem: item[0],
                desc_master: masterDescription,
                status_model: 'NEW MODEL'
            };
            return obj;
        });
        const uniqueMaster = Array.from(new Set(filterMaster));
        const dataMasterItemFilter: any[] = await FetchMasterItem(uniqueMaster);

        const filtered = convertedMaster.filter((itemfilter, indexfilter, arrayfilter) =>
            arrayfilter.findIndex(objfilter => objfilter.id_masterItem === itemfilter.id_masterItem) === indexfilter
        );
        const filteredData = filtered.filter((itemconvert) => !dataMasterItemFilter.some(Itemmas => Itemmas.id_masterItem === itemconvert.id_masterItem));
        console.log('filteredData', filteredData);
        setdataMaster(filteredData);
    };

    const handleRegisterToObj = (dataarr: any[]) => {
        const convertedItemReg: any[] = dataarr.slice(1).map((item: any, indax: any) => {
            const id: string = 'Reg' + handleUser() + setPrimaryKeydate() + indax + item[0] + item[3];
            const obj: any = {
                id_item: id, item_number: item[3] ? item[3] : null, item_type: item[7] ? item[7] : null,
                prod_line: item[6] ? item[6] : null, grouptit: item[8] ? item[8] : null, size_l_w_h: item[15] ? item[15] : null,
                ecn_rev: item[13] ? item[13] : null, suite_mold: item[14] ? item[14] : null, bom_release: handleTodate(item[9]),
                s_t: item[12] ? item[12] : null, oem_cust: item[16] ? item[16] : null, description: item[4] ? item[4] : null,
                um: item[5] ? item[5] : null, project: item[17] ? item[17] : null, op: item[21] ? item[21] : null,
                boi_scrap: item[26] ? item[26] : null, scrap: item[19] ? item[19] : null, qty_per: item[11] ? item[11] : null,
                usertit: handleUser(), start_effective: handleTodate(item[10]), option_group: item[24] ? item[24] : null,
                process: item[25] ? item[25] : null, lt_ofset: item[20] ? item[20] : null, parent_item: item[1] ? item[1] : null,
                master_item: item[0] ? item[0] : null, reference: item[18] ? item[18] : null, end_effective: handleTodate(item[27]),
                statusrpa13_5: 'default', statusrpa1_4_3: 'default', remarks: item[28] ? item[28] : null, sequence_number: item[22] ? item[22] : null,
                forecast: item[23] ? item[23] : null
            };
            return obj;
        });
        setRegister(convertedItemReg);
    };

    const handleItemtit = async (dataarr: any) => {
        const filterItem: string[] = [];
        const convertedItem: any[] = dataarr.slice(1).map((item: any) => {
            filterItem.push(item[3]);
            const obj: any = {
                id_item: item[3],
                status_item: 'use',
                item_type: item[7] ? item[7] : null,
                usertit: handleUser(),
                item_number: item[3],
                prod_line: item[6] ? item[6] : null,
                grouptit: item[8] ? item[8] : null,
                size_l_w_h: item[15] ? item[15] : null,
                ecn_rev: item[13] ? item[13] : null,
                suite_mold: item[14] ? item[14] : null,
                bom_release: handleTodate(item[9]),
                s_t: item[12] ? item[12] : null,
                oem_cust: item[16] ? item[16] : null,
                description: item[4] ? item[4] : null,
                um: item[5] ? item[5] : null,
                project: item[17] ? item[17] : null,
                p_m: item[29] ? item[29] : null
            };
            return obj;
        });
        const uniqueItem = Array.from(new Set(filterItem));
        const dataItemFilter: any[] = await FetchitemTIT(uniqueItem);
        const filtered = convertedItem.filter((itemfilter, indexfilter, arrayfilter) =>
            arrayfilter.findIndex(objfilter => objfilter.id_item === itemfilter.id_item) === indexfilter
        );
        const filteredData = filtered.filter((itemconvert) => !dataItemFilter.some(itemDataFilter => itemDataFilter.id_item === itemconvert.id_item));
        setItemtit(filteredData);
    };

    const handleOnsubmit = async () => {
        let statusMasterItem = await InsertMasterItem(dataMaster);
        let statusitemtit = await Insertitemtit(itemtit);
        if (statusMasterItem === 'pass' && statusitemtit === 'pass') {
            let statusBomdata_v1 = await Insertbomdata_v2(databom);
            let statusRegisterbom = await InsertRegisterbom(Rdddegister);
            statusRegisterbom === 'pass' ? toast.success('เพิ่มข้อมูลลง OBU สำเร็จ', CustomToastContainer()) : toast.error('เพิ่มข้อมูลลง OBU ไม่สำเร็จ', CustomToastContainer());
            statusBomdata_v1 === 'pass' ? toast.success('เพิ่ม bom สำเร็จ', CustomToastContainer()) : toast.error('เพิ่ม bom ไม่สำเร็จ', CustomToastContainer());
        }

        if (statusitemtit && statusMasterItem) {
            toast.success("คีข้อมูลเสร็จสิ้น", CustomToastContainer());
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    return (
        <div className='flex justify-center mt-4 ' >
            <div className='w-11/12' >
                <div className='ml-5'>
                    <div className='flex justify-center items-center mb-5'>
                        <div className='create_head_input_desc'>
                            <p className=' create_head_desc'>Description : </p>
                            <Input
                                type="text"
                                accept=".xlsx, .xlsm, .csv"
                                className='input_bordered'
                                onChange={(event) => setMasterDescription(event.target.value)}
                                placeholder='Enter Description'
                            />
                        </div>
                        <div className="create_head_input_file">
                            <Input
                                type="file"
                                id="file-input"
                                accept=".xlsx, .xlsm, .csv"
                                className=''
                                onChange={handleFileUpload} />
                            <label htmlFor="file-input" className='create_head_input_file_label'>เลือกไฟล์</label>
                        </div>
                        <Button style={{ backgroundColor: '#28D39A' }} onClick={handleOnsubmit}>ยืนยัน</Button>
                    </div>
                    <DataInsertExcel columns={columninsertExcel} data={databom} />
                </div>
            </div>

        </div>
    );
}
