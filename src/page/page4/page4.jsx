import React from 'react';

import '../../animationCSS/animation.css';
import './page4.css';

// 导入加载中组件
import ShowLoading from '../../component/loading.jsx';

import { Comment, Icon, Tooltip, Avatar } from 'antd';


class Page4 extends React.Component {
    state = {
        messageList: [],
        showLoading: true,
        replyCommentText: '',
        showReplyCommentIpt: false
    }

    // 获取留言列表数据
    async getMseeageList() {
        const data = await (await fetch('http://localhost:3000/myWebSite/getComments', { mode: 'cors' })).json();
        this.setState({ messageList: JSON.parse(data), showLoading: false });
    }


    // 渲染留言列表
    renderMessageList = () => {
        const { messageList, replyCommentText, showReplyCommentIpt } = this.state;
        return messageList.map((item, index) => {
            return <Comment
                key={index}
                actions={
                    [
                        // 顶一下按钮
                        <span key="like" style={{ color: '#fff' }}>
                            <Tooltip title="顶一下">
                                <Icon type="like" theme={item.praise !== 0 ? 'filled' : 'outlined'} onClick={() => this.praiseComment(index)} />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.praise}</span>
                        </span>,

                        // 踩一下按钮
                        <span key="dislike" style={{ color: '#fff' }}>
                            <Tooltip title="踩一下">
                                <Icon type="dislike" theme={item.disapprove !== 0 ? 'filled' : 'outlined'} onClick={() => this.disApproveComment(index)} />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.disapprove}</span>
                        </span>,

                        // 回复按钮 这是三元表达式
                        showReplyCommentIpt ?
                            <div>
                                <input
                                    value={replyCommentText}
                                    onChange={e => this.setState({ replyCommentText: e.target.value })}
                                    onKeyPress={e => e.charCode === 13 && this.replyComment(index)}
                                    placeholder="请输入回复内容"
                                />
                                <span onClick={() => this.setState({ showReplyCommentIpt: false })} className='cancelReplyBtn'>取消</span>
                            </div>
                            : <span onClick={() => this.setState({ showReplyCommentIpt: true })} className='replyCommentBtn'>回复</span>
                    ]
                }
                author={item.name}
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                content={<p className='commentContent'>{item.content}</p>}
                datetime={item.createTime}
            />
        })
    }

    // 留言点赞
    async praiseComment(index) {
        const { messageList } = this.state;
        // 发送点赞请求
        const result = JSON.parse(await (await fetch('http://localhost:3000/myWebSite/praise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: messageList[index]._id }),
            mode: 'cors'
        })).json());

        // 如果请求成功
        if (result.status === 200) {
            messageList[index].praise += 1;
            this.forceUpdate();
        }
    }

    // 留言 踩
    async disApproveComment(index) {
        const { messageList } = this.state;
        // 发送踩一下请求
        const result = JSON.parse(await (await fetch('http://localhost:3000/myWebSite/disapprove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: messageList[index]._id }),
            mode: 'cors'
        })).json());

        // 如果请求成功
        if (result.status === 200) {
            messageList[index].disapprove += 1;
            this.forceUpdate();
        }
    }



    componentDidMount() {
        this.getMseeageList();
    }



    render() {
        const { showLoading } = this.state;
        return <div className='page4Container'>
            <div className='messageBoard' id='messageBoard'>
                <div className='messageBoardTitle'>留言板</div>
                <div className='messageList'>
                    {showLoading ? ShowLoading('留言板加载中...') : this.renderMessageList()}
                </div>
            </div>
            <div className='leaveMessageForm'>

            </div>
        </div>
    }
}

export default Page4;