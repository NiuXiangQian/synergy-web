import store from '@/store';

/**
 * 协同编辑事件
 */
class SynergyUpdateEvent {

    resource;
    page;

    /**
     * 初始化构造方法
     *
     * @param {Object} resource Socket消息
     * @param page
     */
    constructor(resource, page) {
        this.resource = resource;
        this.page = page;
    }

    handle() {
        console.log(this.resource.content)
        this.page.context = this.resource.content
        //设置临时数据防止重写渲染
        this.page.temp_context=this.resource.content;

    }
}

export default SynergyUpdateEvent;
