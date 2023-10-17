'use client'
import React, { useEffect, useState } from 'react';
export const ModalResultCreateForm = ({ statusModel, resultInsert }: { statusModel: boolean; resultInsert: any[] }) => {
    const [statusResult, setStatusResult] = useState<boolean>(false);
    useEffect(() => {
        setStatusResult(statusModel);
    }, [statusModel]);

    const handleonClick = () => {
        setStatusResult(false);
    }
    return (
        <div>
            {statusResult && (
                <div className="modal">
                    <div className="modal_template">
                        <div className="modal_head">
                            <p>ผลการเพิ่มไอเท็ม</p>
                        </div>
                        <div className="modal_body">
                            <div className='display-flex'> <p className=' w_5_100'>item number : </p> <p>{resultInsert[0].item_number}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>um : </p> <p>{resultInsert[0].um}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>date release : </p> <p>{resultInsert[0].bom_release}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>item type : </p> <p>{resultInsert[0].item_type}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>group : </p> <p>{resultInsert[0].grouptit}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>description : </p> <p>{resultInsert[0].description}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>set : </p> <p>{resultInsert[0].s_t}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>size - l,w,h : </p> <p>{resultInsert[0].size_l_w_h}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>ecn rev : </p> <p>{resultInsert[0].ecn_rev}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>suite mold : </p> <p>{resultInsert[0].suite_mold}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>oem cust : </p> <p>{resultInsert[0].oem_cust}</p></div>
                            <div className='display-flex'> <p className=' w_5_100'>project : </p> <p>{resultInsert[0].project}</p></div>
                        </div>
                        <div className='modal_footer' >
                            {resultInsert.length > 0 ? <p className='mt_5 color_success'>เพิ่ม{resultInsert[0].item_number} สำเร็จ</p> : <p className='mt_5 color_error'>เพิ่มไม่สำเร็จอาจมีปัญหา server</p>}

                            <button className='bg-c-red button-w100-h40' onClick={handleonClick}>ปิด</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};