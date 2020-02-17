import React from 'react';

import { Icon } from 'antd';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: '#fff',
    fontSize: '1.5rem',
    textAlign: 'center'
}

const ShowLoading = (props) => <div style={style}>
    <div><Icon type="sync" spin={true} /></div>
    <div>{props}</div>
</div>


export default ShowLoading;