import store from '@/store';
import config from '@/config/config';
import WsSocket from '@/plugins/socket/ws-socket';


// 引入消息处理类

import SynergyEditEvent from '@/plugins/socket/event/synergy-edit-event';
import SynergyUpdateEvent from '@/plugins/socket/event/synergy-update-event';

/**
 * SocketInstance 连接实例
 *
 * 注释: 所有 WebSocket 消息接收处理在此实例中处理
 */
class SocketInstance {

    /**
     * WsSocket 实例
     */
    socket;

    /**
     * 当前页面
     **/
    page;

    /**
     * SocketInstance 初始化实例
     */
    constructor(type, gid,page) {
        this.page=page
        this.init(type, gid)

    }

    init(type, gid) {
        this.socket = new WsSocket(() => {
            return `${config.ws_url}?type=` + type + `&gid=` + gid + `&token=aaa&uid=` + new Date().getTime();
        }, {
            onError: (evt) => {
                console.log(evt)
                console.log('Websocket 连接失败回调方法')
            },
            // Websocket 连接成功回调方法
            onOpen: (evt) => {
                console.log(evt)
                this.updateSocketStatus(true);
            },
            // Websocket 断开连接回调方法
            onClose: (evt) => {
                console.log(evt)
                this.updateSocketStatus(false);
            },
            urlCallBack: () => {
                return `${config.ws_url}?token=1111`;
            }
        });

        this.registerEvents();
        this.connect();
    }

    // 连接 WebSocket 服务
    connect() {
        this.socket.connection();
    }

    /**
     * 注册回调消息处理事件
     */
    registerEvents() {
        this.socket.on('synergy-edit-event', (data) => {
            (new SynergyEditEvent(data,this.page)).handle();
        }).on('synergy-update-event', (data) => {
            (new SynergyUpdateEvent(data,this.page)).handle();
        });
    }

    /**
     * 更新 WebSocket 连接状态
     *
     * @param {Boolean} status 连接状态
     */
    updateSocketStatus(status) {
        store.commit('UPDATE_SOCKET_STATUS', status);
    }

    /**
     * 聊天发送数据
     *
     * @param {Object} mesage
     */
    send(mesage) {
        this.socket.send(mesage);
    }

    /**
     * 推送消息
     *
     * @param {String} event 事件名
     * @param {object} data 数据
     */
    emit(event, data) {
        this.socket.emit(event, data);
    }
}

export default SocketInstance;
