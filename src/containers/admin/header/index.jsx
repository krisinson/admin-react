import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { Modal, Button, Icon } from 'antd'
import screenfull from "screenfull"
import { removeUserToken } from '../../../redux/action-creators/user'
import LinkButton from '../../../components/link-button'
import { reqWeather } from '../../../api'
import './index.less'

const { confirm } = Modal

@connect(
    state => ({ 
        username: state.user.user.username,
        headerTitle:state.headerTitle
    }), //user: state.user.user, hasLogin: state.user.hasLogin }),
    { removeUserToken }
)
@withRouter

class Header extends Component {
    state = {
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        dayPictureUrl: '',
        weather: '',
        isFullScreen: false
    }

    logout = () => {
        confirm({
            title: '确定退出登录吗?',
            onOk: () => {
                this.props.removeUserToken()
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }
    // 显示天气的函数
    showWeather = async () => {
        // 获取数据
        const { dayPictureUrl, weather } = await reqWeather('北京')
        // 更新状态
        this.setState({
            dayPictureUrl,
            weather

        })

    }

    // 全屏或缩放的函数
    handleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        }, 1000);
        this.showWeather()

        // screenfull.on('change', () => {
        //     console.log('Am I fullscreen?', screenfull.isFullscreen ? 'Yes' : 'No');
        // });
        screenfull.onchange(() => {

            this.setState({
                isFullScreen : !this.state.isFullScreen
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }


    render() {
        const { currentTime, dayPictureUrl, weather, isFullScreen } = this.state
        const {username,headerTitle}=this.props
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.handleFullscreen}>
                        <Icon type={isFullScreen ? "fullscreen-exit" : "fullscreen"} />
                    </Button>&nbsp;
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{headerTitle}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header