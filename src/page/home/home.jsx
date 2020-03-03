import React from 'react';

// 样式
import '../../animationCSS/animation.css';
import './home.css';
import './home.moble.css';

import { Icon } from 'antd';

class Home extends React.Component {
    state = {
        display: false
    }
    componentDidMount() {
        this.setState({
            display: true
        })
    }
    render() {
        const { display } = this.state;
        return <div className='homeContainer'>
            <div className='contextContainer' style={{ visibility: display ? 'visible' : 'hidden' }}>
                <p><a href="https://github.com/patienceroll" target='blank'>My GitHub <Icon type="login" /></a></p>
                <p><a href="https://blog.csdn.net/qq_40653782" target='blank'>My Blog <Icon type="login" /></a></p>
                <div>
                    <span>您好,</span>
                    <br />
                    欢迎来访!
                </div>
                <p>这是patience的个人网站,将持续更新...</p>
            </div>
            <a href='http://www.beian.miit.gov.cn/' target='blank'>渝ICP备20001509号</a>
        </div>
    }
}

export default Home;