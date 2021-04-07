import SocketInstance from './socket-instance';

export default {
    created() {
        // 判断用户是否登录

    },
    methods: {
        // 页面初始化设置
        initialize() {
            SocketInstance.connect();

        },

        // 加载用户相关设置信息，更新本地缓存
        loadUserSetting() {
        },


    }
}
