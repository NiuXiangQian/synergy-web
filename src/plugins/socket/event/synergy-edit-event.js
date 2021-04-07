import store from '@/store';

/**
 * 协同编辑事件
 */
class SynergyEditEvent {

    resource;
    page;

    /**
     * 初始化构造方法
     *
     * @param {Object} resource Socket消息
     * @param page
     */
    constructor(resource,page) {
        this.resource = resource;
        this.page=page;
    }

    handle() {

    }
}

export default SynergyEditEvent;
