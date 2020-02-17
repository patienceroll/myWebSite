import React from 'react';

import '../../animationCSS/animation.css';
import './page4.css';

// 导入加载中组件
import ShowLoading from '../../component/loading.jsx';

import { Comment, Icon, Tooltip, Avatar, Button } from 'antd';

const textareaRef = React.createRef();

class Page4 extends React.Component {
    state = {
        messageList: [],
        showLoading: true,
        replyCommentText: '',
        showReplyCommentIptIndex: NaN,
        nameIptValue: '',
        textareaValue: '',
        diableSubBtn: false
    }

    // 产生随机名字
    creatRandomName() {
        const name = localStorage.getItem('nameIptValue') || '访客' + Math.floor(Math.random() * 1000 + 1000);
        this.setState({ nameIptValue: name });
    }

    // 获取留言列表数据
    async getMseeageList() {
        const data = await (await fetch('http://114.55.28.254:3000/myWebSite/getComments', { mode: 'cors' })).json();
        this.setState({ messageList: JSON.parse(data).reverse(), showLoading: false });
    }


    // 渲染留言列表
    renderMessageList = () => {
        const { messageList, replyCommentText, showReplyCommentIptIndex } = this.state;
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
                        showReplyCommentIptIndex === index ?
                            <div>
                                <input
                                    value={replyCommentText}
                                    onChange={e => this.setState({ replyCommentText: e.target.value })}
                                    onKeyPress={e => e.charCode === 13 && this.replyComment(index)}
                                    placeholder="请输入回复内容"
                                />
                                <span onClick={() => this.replyComment(index)} className='submitReplyBtn'>确定</span>
                                <span onClick={() => this.setState({ showReplyCommentIptIndex: NaN })} className='cancelReplyBtn'>取消</span>
                            </div>
                            : <span onClick={() => this.setState({ showReplyCommentIptIndex: index })} className='replyCommentBtn'>回复</span>
                    ]
                }
                author={item.name}
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                content={<p className='commentContent'>{item.content}</p>}
                datetime={item.createTime}
                children={item.comments.length && item.comments.map(itemSon =>
                    <Comment
                        key={itemSon.name}
                        author={itemSon.name}
                        datetime={itemSon.createTime}
                        content={<p className='commentContent'>{itemSon.content}</p>}
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
                    />
                )}
            />
        })
    }

    // 留言点赞
    async praiseComment(index) {
        const { messageList, replyCommentText } = this.state;
        // 发送点赞请求
        const result = JSON.parse(await (await fetch('http://114.55.28.254:3000/myWebSite/praise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: messageList[index]._id, content: replyCommentText }),
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
        const result = JSON.parse(await (await fetch('http://114.55.28.254:3000/myWebSite/disapprove', {
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

    // 回复留言
    async replyComment(index) {
        // 关闭输入框
        this.setState({ showReplyCommentIptIndex: NaN });
        const { messageList, nameIptValue, replyCommentText } = this.state;
        if (replyCommentText.trim() === '') {
            return window.alert('输入的内容不能为空!')
        }
        if (!nameIptValue.trim()) {
            await this.creatRandomName();
        }
        // 发送请求
        const result = JSON.parse(await (await fetch('http://114.55.28.254:3000/myWebSite/replyComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: messageList[index]._id, content: replyCommentText, name: nameIptValue }),
            mode: 'cors'
        })).json());

        if (result.status === 200) {
            this.getMseeageList();
        }
    }

    // 提交留言
    async submitComment() {
        const { nameIptValue, textareaValue } = this.state;
        // 如果名字为空产生随机名字
        if (!nameIptValue.trim()) {
            await this.creatRandomName();
        }
        // 如果留言内容为空 直接返回
        if (!textareaValue.trim()) {
            return window.alert('内容不能为空！')
        }
        // 禁用提交按钮
        this.setState({ diableSubBtn: true });
        const result = JSON.parse(await (await fetch('http://114.55.28.254:3000/myWebSite/submitComment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameIptValue, content: textareaValue }),
            mode: 'cors'
        })).json());
        if (result.status === 200) {
            this.getMseeageList();
            textareaRef.current.value = '';
        }
        // 恢复提交按钮
        this.setState({ diableSubBtn: false });

    }

    componentDidMount() {
        this.getMseeageList();
        this.creatRandomName();
    }



    render() {
        const { showLoading, nameIptValue, diableSubBtn } = this.state;
        return <div className='page4Container'>
         
                <div className='messageBoardTitle'>留言板</div>

                {/* 留言板展示列表 */}
                <div className='messageBoard' id='messageBoard'>
                    <div className='messageList'>
                        {showLoading ? ShowLoading('留言板加载中...') : this.renderMessageList()}
                    </div>
                </div>

                {/* 留言表单 */}
                <div className='leaveMessageForm'>
                    <div className='leaveMessageFormTitle'>留言</div>

                    <div className='leaveMessageFormName'>
                        <span>姓名(昵称):</span>
                        <input
                            value={nameIptValue}
                            placeholder='请输入任意字符作为姓名'
                            onFocus={e => e.target.style.backgroundColor = "#000"}
                            onBlur={e => e.target.style.backgroundColor = "transparent"}
                            onChange={e => { this.setState({ nameIptValue: e.target.value }); localStorage.setItem('nameIptValue', e.target.value); }}
                        ></input>
                    </div>


                    <div className='leaveMessageFormWarm'>
                        {/^[\u4e00-\u9fa5a-zA-Z0-9]{3,15}$/.test(nameIptValue) ? null : '请输入3-15位的汉字,英文或数字'}
                    </div>

                    <div className='leaveMessageFormContext'>
                        <span>留言内容:</span>
                        <textarea
                            placeholder='请输入留言'
                            maxLength={155} ref={textareaRef}
                            onFocus={() => textareaRef.current.style.backgroundColor = "#000"}
                            onBlur={() => textareaRef.current.style.backgroundColor = "transparent"}
                            onChange={(e) => { this.setState({ textareaValue: e.target.value }) }}
                        >
                        </textarea>
                    </div>

                    <div className='leaveMessageFormSubBtn'>
                        <Button type="primary" onClick={() => this.submitComment()} disabled={diableSubBtn}>
                            提交留言
                    </Button>
                    </div>
                </div>
        </div>
    }
}

export default Page4;