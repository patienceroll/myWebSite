import React from 'react';

import '../../animationCSS/animation.css';
import './page2.css';

// ant 组件
import { Card } from 'antd';
const { Meta } = Card;

class Page2 extends React.Component {

    state = {
        programList: [
            {
                adress: 'http://114.55.28.254/sars/',
                title: '2020新型肺炎疫情关注Demo',
                content: '主要展示了新型冠状肺炎的地图疫情,数据变化曲线,数据表,以及最近进展.',
                images: [
                    'https://github.com/patienceroll/sars-situation/raw/master/readMeData/1.png',
                    'https://github.com/patienceroll/sars-situation/raw/master/readMeData/2.png',
                    'https://github.com/patienceroll/sars-situation/raw/master/readMeData/3.png',
                    'https://github.com/patienceroll/sars-situation/raw/master/readMeData/4.png',
                ]
            },
            {
                adress: 'http://114.55.28.254/todo/',
                title: 'toDoList-ReduxDemo',
                content: '使用redux编写的toDoList小Demo',
                images: [
                    'https://github.com/patienceroll/toDoList-reduxDemo/raw/master/public/IntrolImages/1.jpg',
                    'https://github.com/patienceroll/toDoList-reduxDemo/raw/master/public/IntrolImages/2.jpg'
                ]
            }
        ]
    }

    // card-cover-inner 鼠标hover动画
    hoverAnimate(e) {
        const getHopeElement = e.target.parentNode;
        const height = getHopeElement.clientHeight;
        getHopeElement.style.transform = `translateY(-${(height - 243) > 0 ? (height - 243) : 0}px)`;
    }


    renderProgramList() {
        const { programList } = this.state;
        return programList.map((item, index) => <Card
            className='programCard'
            onClick={() => window.open(item.adress)}
            key={index}
            // card 图片部分html
            cover={<div className='card-cover-inner'
                onMouseEnter={e => this.hoverAnimate(e)}
                onMouseLeave={e => e.target.parentNode.style.transform = 'translateY(0)'}
            >
                {item.images.map((itemS, indexS) => <img alt={item.title} src={itemS} key={indexS} />)}
            </div>}
        >
            <Meta title={item.title} description={item.content} />
        </Card >)
    }

    render() {
        return <div className='page2Container'>
            <div className='page2Title'>个人项目</div>
            <div className='page2Program'>
                {this.renderProgramList()}
            </div>
        </div>
    }
}

export default Page2;