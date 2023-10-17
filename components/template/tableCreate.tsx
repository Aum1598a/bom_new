'use client'
import React, { useState } from 'react';
interface TableCreateProps {
    dataCreate: any[]; // ประกาศ Props แบบถูกต้อง
}
export const TableCreate: React.FC<TableCreateProps> = ({ dataCreate }) => {
    const columnName: string[] = ['No.','address', 'master_item', 'parent_item', 'item_number', 'level', 'start_effective', 'qty_per',
        'sequence_number', 'boi_scrap', 'process', 'forecast', 'lt_ofset', 'usertit', 'op', 'scrap', 'option_group',
        'reference', 'end_effective', 'remarks'];
    return (
        <div className='overflow-xx-auto tempage_tabel'>
            <table className='Table_tabel'>
                <thead className='Table_thead'>
                    <tr className='Table_thead_tr'>
                        {columnName.map((item: string, index: number) => {
                            return (<th key={index} className='Table_thead_th'>{item}</th>)
                        })}
                    </tr>
                </thead>
                <tbody className='Table_tbody'>
                    {dataCreate.map((item: any, index: number) => {
                        return <tr key={index} className='Table_tbody_tr' style={{ backgroundColor: `rgba(32, 39, 46, ${0.8 - 0.1 * item.level})` }}>
                            <td className='Table_thead_th'>{index + 1}</td>
                            <td className='Table_thead_th'>{item ? item.address : null}</td>
                            <td className='Table_thead_th'>{item ? item.master_item : null}</td>
                            <td className='Table_thead_th'>{item ? item.parent_item : null}</td>
                            <td className='Table_thead_th' style={{ paddingLeft: 10 + item.level * 40 }}>{item ? item.item_number : null}</td>
                            <td className='Table_thead_th'>{item ? item.level : null}</td>
                            <td className='Table_thead_th'>{item ? item.start_effective : null}</td>
                            <td className='Table_thead_th'>{item ? item.qty_per : null}</td>
                            <td className='Table_thead_th'>{item ? item.sequence_number : null}</td>
                            <td className='Table_thead_th'>{item ? item.boi_scrap : null}</td>
                            <td className='Table_thead_th'>{item ? item.process : null}</td>
                            <td className='Table_thead_th'>{item ? item.forecast : null}</td>
                            <td className='Table_thead_th'>{item ? item.lt_ofset : null}</td>
                            <td className='Table_thead_th'>{item ? item.usertit : null}</td>
                            <td className='Table_thead_th'>{item ? item.op : null}</td>
                            <td className='Table_thead_th'>{item ? item.scrap : null}</td>
                            <td className='Table_thead_th'>{item ? item.option_group : null}</td>
                            <td className='Table_thead_th'>{item ? item.reference : null}</td>
                            <td className='Table_thead_th'>{item ? item.end_effective : null}</td>
                            <td className='Table_thead_th'>{item ? item.remarks : null}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
};

// id_item text not null,
// master_item text null,
// parent_item text null,
// item_number text null,
// description text null,
// um text null,
// prod_line integer null,
// item_type text null,
// grouptit text null,
// bom_release date null,
// start_effective date null,
// qty_per real null,
// s_t text null,
// ecn_rev text null,
// suite_mold text null,
// size_l_w_h text null,
// oem_cust text null,
// project text null,
// reference text null,
// scrap text null,
// lt_ofset text null,
// op text null,
// sequence_number text null,
// forecast text null,
// option_group text null,
// process text null,
// boi_scrap text null,
// end_effective text null,
// remarks text null,
// statusrpa text null,
// usertit text null,




