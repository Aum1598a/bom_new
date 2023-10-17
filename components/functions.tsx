import { useEffect, useState } from "react";
import { ToastOptions } from "react-toastify";
import { InsertWorktest } from "@/supabase/insertDataSB";
import {   FetchWO, FetchWorktest } from "@/supabase/fetchDataSB";
// import { UpdateStatusWT } from "@/supabase/updateDataSB";
import * as XLSX from 'xlsx';

export const CustomToastContainer = () => {
    const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    return toastOptions
};

export const CheckStatusTest = () => {
    const [dataWorkTest, setDataWorkTest] = useState<any[]>([]);
    const [checkInsertWT, setCheckInsert] = useState<any[]>([]);
    const targetTimes = ["10:50:00", "16:35:00"];

    // const StatusWT = (bomMaster: any[], item: any) => {release
    //     let parent: string[] = [item.item_number];
    //     let idname: string[] = [item.id_item_number];
    //     UpdateStatusWT('id_item_number', 'statuswork', item.id_item_number);
    //     let bomsettest = bomMaster;
    //     for (let index = 0; index < bomMaster.length; index++) {
    //         bomsettest.map((itemNumber: any, i: number) => {
    //             if (itemNumber.parent_item === parent[parent.length - 1]) {
    //                 parent.push(itemNumber.item_number);
    //                 UpdateStatusWT('id_item_number', 'statuswork', itemNumber.id_item_number);
    //                 idname.push(itemNumber.id_item_number);
    //                 bomsettest = bomsettest.filter(itemfil => itemfil.id_item_number !== itemNumber.id_item_number);
    //             }
    //             if (bomsettest.filter(adataitem => adataitem.parent_item === parent[parent.length - 1]).length === 0) {
    //                 let name: string = parent[parent.length - 1];
    //                 const indexToRemove = parent.indexOf(name);
    //                 if (indexToRemove !== -1) {
    //                     parent.splice(indexToRemove, 1);
    //                 }
    //             }
    //         })
    //     }
    // };

    function scheduleLog(timeString: string) {
        const currentTime = new Date();
        const targetTime = new Date(currentTime.toDateString() + " " + timeString);//12092023-545110

        if (targetTime > currentTime) {
            const timeDifference = targetTime.getTime() - currentTime.getTime(); // คำนวณเวลาเป็น milliseconds
            setTimeout(() => {
                setTimeout(() => {
                    handleFetchWO();
                    console.log("คลิกแล้วทำการ log ที่นี่");
                }, 1000);
                console.log("เวลาถึง " + timeString + " แล้ว ทำการ log ที่นี่");
            }, timeDifference);
        } else {
            console.log("เวลา " + timeString + " ผ่านไปแล้ว");
        }
    };

    targetTimes.forEach((time) => {
        scheduleLog(time);
    });

    const handleFetchWO = async () => {
        const currentTime = new Date();
        const dateString = currentTime.toISOString().substring(0, 10);//2022-03-17
        const dataWO = await FetchWO(dateString);
        setDataWorkTest(dataWO);
        handleWorkTest(dataWO);
    };

    const handleWorkTest = async (dataWorkTest: any[]) => {
        if (dataWorkTest.length === 0) {
            return null
        }
        else {
            let insertWT: any[] = [];
            let idWorkTest: string[] = [];
            for (let index = 0; index < dataWorkTest.length; index++) {
                dataWorkTest.map((item) => {
                    idWorkTest.push(item.Work_order_id);
                    let dataInsertWT: any = {
                        id_worktest: item?.Work_order_id ? item.Work_order_id : null,
                        item_number: item.Item_number ? item.Item_number : null,
                        status_worktest: 'NO',
                        status_test: 'N_T',
                        order_date: item?.Order_date ? item.Order_date : null,
                        release: item?.Release_date ? item.Release_date : null,
                        due: item?.Due_date_PD ? item.Due_date_PD : null,
                        prod_area: item?.Production_area ? item.Production_area : null,
                        prod_unit: item?.Production_unit ? item.Production_unit : null
                    }
                    insertWT = [...insertWT, dataInsertWT];
                })
            }
            const dataidWorkTest = await FetchWorktest(idWorkTest);
            const filteredData = insertWT.filter((itemconvert) => !dataidWorkTest.some(itemDataFilter => itemDataFilter.id_worktest === itemconvert.id_worktest));
            const filtered = filteredData.filter((itemfilter, indexfilter, arrayfilter) =>
                arrayfilter.findIndex(objfilter => objfilter.id_worktest === itemfilter.id_worktest) === indexfilter
            );
            if (filteredData.length !== 0 && checkInsertWT.length === 0) {
                console.log('checkInsertWT', checkInsertWT);
                const dataInsertWorktest = await InsertWorktest(filtered);
                setCheckInsert([0])
                setCheckInsert(dataInsertWorktest)
            }


            // const filteredData = insertWT.filter((itemconvert) => !dataidWorkTest.some(itemDataFilter => itemDataFilter.id_worktest === itemconvert.id_worktest));
            // const filtereditem = data.filter((itemconvert) => !filteredData.some(itemDataFilter => itemDataFilter.id_item_number === itemconvert.id_item_number));

            // if (checkInsertWT) {
            //     const dataInsertWorktest = await InsertWorktest(filteredData);
            //     setCheckInsert(dataInsertWorktest)
            // }

            // let masterName: string[] = data.map(item => item.master_item);
            // const datamaster = await FetchBomdata_v1Masterarr(masterName);
            // handleSetstatusitem(filtereditem, datamaster);
        }
    }

    return <></>
};

export const ExcelImport = (file: File | undefined, setExceldata: any) => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
            setExceldata(jsonData);
        };
        reader.readAsArrayBuffer(file);
    }
    return ExcelImport
};

export const SortModelData = (data: any[]) => {
    const dataSearch = data;
    if (!dataSearch) {
        return null;
    }
    else {
        let arraydata: any[] = (dataSearch.filter((item: any) => item.level === '0'));
        let arraydatasa: any[] = (dataSearch.filter((item: any) => item.level !== '0'));
        let testdata: number = arraydatasa.length;
        let arraydatastring: string[] = [];
        arraydatastring.push(arraydata[0]?.parent_item ? arraydata[0].parent_item : null);
        console.log(data.length);
        for (let index = 0; index <= testdata; index++) {
            let inddd: number = 0;
            arraydatasa.map((item: any) => {
                if (item.parent_item === arraydatastring[arraydatastring.length - 1] && inddd === 0) {
                    arraydata.push(item);
                    arraydatastring.push(item.item_number);
                    inddd = inddd + 1;
                    arraydatasa = arraydatasa.filter(itemfil => itemfil.id_item_number !== item.id_item_number);
                }
                if (arraydatasa.filter(arraydataitem => arraydataitem.parent_item === arraydatastring[arraydatastring.length - 1]).length === 0) {
                    let name: string = arraydatastring[arraydatastring.length - 1];
                    const indexToRemove = arraydatastring.indexOf(name);
                    if (indexToRemove !== -1) {
                        arraydatastring.splice(indexToRemove, 1);
                    }
                }
            })
        }

        return arraydata;
    }
    // setDateRelation(arraydata);
}

