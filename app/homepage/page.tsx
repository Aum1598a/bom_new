'use client'
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface user {
  username: string;
  division: string;
}
export default function Index() {
  const [storedUser, setStoredUser] = useState<user | null>();

  function worksheetTest() {
    const newData = [{
      id_po: '6000',
      Supplier: 'B009',
      data: [
        {
          id_PO: 'B009+11-E407D+2023-09-28',
          group: 'B009_PO',
          DocTP: 'PO',
          Order_Date: '02-10-2023',
          Due_Date: '16-10-2023',
          Buyer: '1579', Req_By: 'PC',
          status: 'finish', Supplier: 'B009',
          Item_Number: '11-E407D',
          Req: '90000001',
          Site: '',
          Qty: '200',
          Price: '100',
          statusPR: 'finish'
        },
        {
          id_PO: 'B009+11-E407D+2023-09-28',
          group: 'B009_PO',
          DocTP: 'PO',
          Order_Date: '02-10-2023',
          Due_Date: '16-10-2023',
          Buyer: '1579', Req_By: 'PC',
          status: 'finish', Supplier: 'B009',
          Item_Number: '11-E407D',
          Req: '90000001',
          Site: '',
          Qty: '200',
          Price: '100',
          statusPR: 'finish'
        },
      ]
    }];

    let rowStart = 7;
    let columns = {
      [`A${rowStart - 1}`]: { t: 's', v: 'กำหนดส่ง' },
      [`B${rowStart - 1}`]: { t: 's', v: 'รายการ' },
      [`C${rowStart - 1}`]: { t: 's', v: 'จำนวน' },
      [`D${rowStart - 1}`]: { t: 's', v: 'หน่วย' },
      [`E${rowStart - 1}`]: { t: 's', v: 'หน่วยละ' },
      [`F${rowStart - 1}`]: { t: 's', v: 'จำนวนเงิน' }
    }

    const worksheet = XLSX.utils.json_to_sheet(newData[0].data);
    type Testtttt = {
      [key: string]: { t: string; v: any };
    };
    let testtttt: Testtttt = {};

    let colEnd = ''
    newData[0].data.forEach((item, index) => {
      testtttt[`A${index + rowStart}`] = { t: 's', v: item.Due_Date };
      testtttt[`B${index + rowStart}`] = { t: 's', v: item.Item_Number };
      testtttt[`C${index + rowStart}`] = { t: 's', v: item.Qty };
      testtttt[`D${index + rowStart}`] = { t: 's', v: 'null' };
      testtttt[`E${index + rowStart}`] = { t: 's', v: item.Price };
      testtttt[`F${index + rowStart}`] = { t: 's', v: +item.Price + item.Qty };
      colEnd = `F${index + rowStart}`
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, { ...testtttt, ...columns, '!ref': `A1:${colEnd}` }, "DataSheet");
    XLSX.writeFile(workbook, 'data.xlsx');



  }

  const newDatas = [{
    id_po: '6000',
    Supplier: 'B009',
    Req_By: 'PC',
    data: [
      {
        id_PO: 'B009+11-E407D+2023-09-28',
        group: 'B009_PO',
        DocTP: 'PO',
        Order_Date: '02-10-2023',
        Due_Date: '16-10-2023',
        Buyer: '1579', Req_By: 'PC',
        status: 'finish', Supplier: 'B009',
        Item_Number: '11-E407D',
        Req: '90000001',
        Site: '',
        Qty: '200',
        Price: '100',
        statusPR: 'finish'
      },
      {
        id_PO: 'B009+11-E407D+2023-09-28',
        group: 'B009_PO',
        DocTP: 'PO',
        Order_Date: '02-10-2023',
        Due_Date: '16-10-2023',
        Buyer: '1579', Req_By: 'PC',
        status: 'finish', Supplier: 'B009',
        Item_Number: '11-E407D',
        Req: '90000001',
        Site: '',
        Qty: '200',
        Price: '100',
        statusPR: 'finish'
      },
    ]
  }];
  const xport = async () => {
    /* Create worksheet from HTML DOM TABLE */
    const table = document.getElementById("Table2XLSX");
    const wb = XLSX.utils.table_to_book(table);
    console.log(wb);

    /* Export to file (start a download) */
    XLSX.writeFile(wb, "SheetJSTable.xlsx");
  };

  const formattedAmount = (value: number) => {

    const format = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 3,
    }).format(value);
    return format;
  }

  useEffect(() => {
    let user = sessionStorage.getItem('user');
    setStoredUser(JSON.parse(user ?? ''));

  }, []);
  return (
    <div className='ml-4 mt-8'>
      {/* <Button color="primary" onClick={worksheetTest}>
        Download to Excel
      </Button> */}
      <div> 
        <p className='text-2xl font-semibold font-mono'>Welcome to {storedUser?.username || ''}</p>
        <p className='text-xl	font-mono'>Webside manage bom</p>
        </div>


      {/* 
      <table id="Table2XLSX">
        {newDatas.map((item: any, index: number) => {
          return (
            <tbody key={index}>
              <tr><td>เลขที่ / PO.NO</td><td>{item.id_po}</td></tr>
              <tr><td colSpan={4}>ผู้ขาย / Supplier: {item.Supplier}</td><td colSpan={4}>ส่งที่ / Shipped to : T.I.T.</td></tr>
              <tr><td colSpan={2}>ติดต่อ</td> <td colSpan={3}>แผนกที่ต้องการขอซื้อ / Requested By : {item.Req_By}</td> <td colSpan={3}>เงื่อนไงการชำระเงิน / Termof Payment : 30</td> </tr>
              <tr><td>กำหนดส่ง</td><td colSpan={3}>รายการ</td><td>จำนวน</td><td>หน่วย</td><td>หน่วยละ</td><td>จำนวนเงิน</td></tr>
              {item.data.map((items: any, index: any) => (
                <tr key={items.Item_Number + index}>
                  <td>{items.Due_Date}</td><td colSpan={3}>{items.Item_Number}</td><td>{items.Qty}</td><td>null</td><td>{items.Price}</td><td>{formattedAmount(+items.Qty + items.Price)}</td>
                </tr>
              ))}
            </tbody>
          )
        })}
      </table>
      <Button onClick={xport}><b>Export XLSX!</b></Button> */}
    </div>
  );
}
