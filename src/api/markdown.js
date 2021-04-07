import {
    post,
    get,
} from '@/utils/request';

//新建markdown文档
export const createMarkdown = () => {
    return post('/markdown/create');
}
//新建markdown文档
export const getMarkdown = (gid) => {
    return get('/markdown/' + gid);
}
