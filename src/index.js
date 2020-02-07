import React from 'react';
import ReactDOM from 'react-dom';

// 样式
import './initStyle.css';
import './index.css';

// 组件
import Home from './page/home/home.jsx';
import Page2 from './page/page2/page2.jsx';
import Page3 from './page/page3/page3.jsx';
import Page4 from './page/page4/page4.jsx';

import { Icon } from 'antd';

// 音乐播放标签 ref
const audioRef = React.createRef();

class NavListIcon extends React.Component {
    render() {
        const { currentPage, changePage } = this.props;
        return <ul className='navListIcon'>
            <li ><span className={currentPage === 1 ? 'current' : null} onClick={() => changePage(1)}></span></li>
            <li ><span className={currentPage === 2 ? 'current' : null} onClick={() => changePage(2)}></span></li>
            <li ><span className={currentPage === 3 ? 'current' : null} onClick={() => changePage(3)}></span></li>
            <li ><span className={currentPage === 4 ? 'current' : null} onClick={() => changePage(4)}></span></li>
        </ul>
    }
}

class Header extends React.Component {

    state = {
        isPause: true
    }

    componentDidMount() {
        
    }

    changePlayState() {
        const { isPause } = this.state;
        const {current} = audioRef;
        console.dir(current);
        isPause && current.play() || current.pause();
        this.setState({
            isPause: !isPause
        })
    }

    render() {
        const { isPause } = this.state;

        return <div className='header'>
            <div className='controler'>
                <div className='wiget' onClick={this.changePlayState.bind(this)}>
                    <Icon type={isPause ? 'play-circle' : "pause-circle"} />
                </div>

                <audio ref={audioRef} className='audio' src='./music/Buckethead-PaleHill.mp3' type="audio/mpeg"></audio>
            </div>

        </div>
    }
}

class Root extends React.Component {
    state = {
        currentPage: 1,
        touchStartY: null
    }

    changePage(num) {
        num && this.setState({
            currentPage: num,
        })

    }

    handleWheel = ({ deltaY }) => {
        const { currentPage } = this.state;
        if (deltaY > 0) {
            currentPage !== 4 && this.changePage(currentPage + 1);
            currentPage === 4 && this.changePage(1);
        }
        if (deltaY < 0) {
            currentPage !== 1 && this.changePage(currentPage - 1);
            currentPage === 1 && this.changePage(4);
        }
    }

    touchStart(e) {
        this.setState({
            touchStartY: e.touches['0'].pageY
        })
    }

    touchEnd(e) {
        const { touchStartY, currentPage } = this.state;
        const touchEndY = e.changedTouches['0'].pageY;

        if (touchEndY - touchStartY < -50) {
            currentPage !== 4 && this.changePage(currentPage + 1);
            currentPage === 4 && this.changePage(1);
        }
        if (touchEndY - touchStartY > 50) {
            currentPage !== 1 && this.changePage(currentPage - 1);
        }
    }

    componentDidMount() {
        document.body.children[0].addEventListener('mousewheel', this.handleWheel.bind(this));
        document.body.children[0].addEventListener('touchstart', this.touchStart.bind(this));
        document.body.children[0].addEventListener('touchend', this.touchEnd.bind(this));
    }

    returnPage() {
        switch (this.state.currentPage) {
            case 1:
                return <Home></Home>
            case 2:
                return <Page2></Page2>
            case 3:
                return <Page3></Page3>
            case 4:
                return <Page4></Page4>
            default:
                return <Home></Home>
        }
    }

    render() {
        const { currentPage } = this.state;
        return <>
            <Header></Header>

            {/* 返回页面 */}
            {this.returnPage()}

            <NavListIcon
                currentPage={currentPage}
                changePage={this.changePage.bind(this)}
            ></NavListIcon>
        </>
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


