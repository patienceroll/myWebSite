import React from 'react';

// 样式
import '../../animationCSS/animation.css';
import './page3.css';
import './page3.moble.css';

import { Icon } from 'antd';


class Page3 extends React.Component {
    state = {
        // 此数据会通过服务器传送
        boxList: [
            {
                title: '厨艺',
                describle: '各式各样的小技巧哟',
                itemList: [
                    {
                        name: '酱油煎蛋',
                        describle: '酱油煎蛋是真的好吃呀！',
                        htmlContent: '4'
                    },
                    {
                        name: '耗油西兰花',
                        describle: '蒜蓉味道的西兰花',
                        htmlContent: '3'
                    },
                    {
                        name: '土豆饼',
                        describle: '土豆煎饼很香哟',
                        htmlContent: '2'
                    }
                ]
            },
            {
                title: '歌手',
                describle: '看看有没有你喜欢的歌手',
                itemList: [
                    {
                        name: 'Buckethead',
                        describle: '蒙脸低调高产吉他艺术家',
                        htmlContent: '1'
                    },
                    {
                        name: 'the eagles',
                        describle: '早期摇滚,后期伟大的乡村乐队',
                        htmlContent: '2'
                    }
                ]
            },
            {
                title: '相册',
                describle: '(已经有雏形了,可以点击查看...)',
                url: 'http://dynamicbear.top/page/photoalbum/',
                itemList: [
                    {
                        name: '美食',
                        describle: '各式各样美食图片',
                        htmlContent: '1'
                    },
                    {
                        name: '风景',
                        describle: '世间风景总是极美',
                        htmlContent: '2'
                    }
                ]
            },
            {
                describle: '(其实都在)建设中...'
            }
        ],
        // 颜色列表
        colorList: ['#996699', '#00CC00', '#666633', '#99CCFF', '#FF6600', '#FF0033', '#99CC33', '#CC3399', '#006600', '#FF6666']
    }


    render() {
        const { boxList, colorList } = this.state;
        const length = colorList.length;
        return <div className='page3Container'>
            {/* 标题 */}
            <div className='page3Title'>便利店</div>
            {/* 盒子 */}
            <div className='page3ContainerInner'>
                <div className='boxContainer'>
                    {/* 渲染盒子 */}
                    {
                        boxList.map((item, index) => <div
                            key={index} className='typeBox'
                            style={{ backgroundColor: colorList[Math.floor(Math.random() * length)], animation: `programCardIn ${(index + 1) * 0.3}s ease` }}
                        >
                            {/* 盒子的覆盖层,避免事件冒泡用 */}
                            <div
                                className='typeBoxCover'
                                onClick={() => item.url && window.open(item.url)}

                            ></div>
                            {/* 盒子的内容 */}
                            {
                                item.itemList === undefined ?
                                    <> <Icon type="sync" spin={true} /><div>{item.describle}</div></>
                                    :
                                    <> <p>{item.title}</p><div>{item.describle}</div></>
                            }

                        </div>)
                    }
                </div>
            </div>
        </div >
    }
}

export default Page3;