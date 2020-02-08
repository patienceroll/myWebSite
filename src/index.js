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
        isPause: true,
        currentMusic: 'Buckethead-PaleHill.mp3',
        musicList: [
            'Buckethead-PaleHill.mp3',
            'Buckethead - Electric Sea.mp3',
            'Buckethead - Stretching Lighthouse.mp3',
            "Eagles - I Can't Tell You Why.mp3",
            'Eagles - Waiting in the Weeds.mp3',
            'Steve Vai - Boston Rain Melody.mp3'
        ]
    }

    componentDidMount() {

    }

    // 只要歌曲暂停了就会触发，但是只有播放状态是自动停止才会有实际响应
    // 也就是说 isPause 为 false
    onMusicPause() {
        const { isPause } = this.state;
        // 自动停止时的响应(非点击播放按钮导致的暂停)
        // eslint-disable-next-line
        !isPause && this.setState({
            isPause: true
        }, this.playNextMusic)
    }

    onMusicPlay() {
        const { isPause } = this.state;
        // 自动播放时的响应(非点击播放按钮导致的播放)
        // eslint-disable-next-line
        isPause && this.setState({
            isPause: false
        })
    }

    // 目前只是下一首歌曲的控件
    playNextMusic() {
        const { currentMusic, musicList } = this.state;
        const { current } = audioRef;
        // 暂停播放
        this.setState({
            isPause: true
        })
        current.pause();
        // 改变 src 路径并自动播放 (当前是随机播放)
        const currentIndex = musicList.findIndex(item => item === currentMusic);
        let nextIndex = Math.floor(Math.random() * musicList.length);

        while (currentIndex === nextIndex) {
            nextIndex = Math.floor(Math.random() * musicList.length);
        }
        this.setState({
            currentMusic: musicList[nextIndex]
        }, () => current.play())
    }

    changePlayState() {
        const { isPause } = this.state;
        const { current } = audioRef;
        // 当值为 true(暂停) 时播放，反之则相反
        // eslint-disable-next-line 
        isPause && current.play() || current.pause();
        this.setState({
            isPause: !isPause
        })
    }

    render() {
        const { isPause, currentMusic } = this.state;

        return <div className='header'>
            {/* 音乐播放器控件 */}
            <div className='controler'>
                <div className='wiget' >
                    {/* 播放按钮 */}
                    <Icon onClick={this.changePlayState.bind(this)} type={isPause ? 'play-circle' : "pause-circle"} />
                    {/* 下一首按钮 */}
                    <Icon onClick={this.playNextMusic.bind(this)} type="step-forward" className='nextMusic' />
                </div>

                <div className='musicTitle'>
                    <span>{currentMusic}</span>
                </div>

                <audio
                    ref={audioRef}
                    onPause={this.onMusicPause.bind(this)}
                    onPlay={this.onMusicPlay.bind(this)}
                    className='audio' src={'./music/' + currentMusic}
                    type="audio/mpeg"
                ></audio>
            </div>
            {/* 联系方式 */}
            <div className='contactWay'>
                <div className='phone'>
                    <Icon type="phone" />
                    <span>18323183293</span>
                </div>
                <div className='obliqueLine'>/</div>
                <div className='email'>
                    <Icon type="mail" />
                    <span>1079105171@qq.com</span>
                </div>
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


