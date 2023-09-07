import React from 'react'
import { Space,Spin } from 'antd';
import '../../style/index.css'
function Loader() {
    return (
        <div className='spin'>
                <p>Loading...Please Wait...</p>
                <Spin className='load' size='large'/>
        </div>
    )
}

export default Loader
