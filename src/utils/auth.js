import Cookies from 'js-cookie';
//todo 同于做后期用户登陆

const NICK_NAME = 'NICK_NAME';

/**
 * 设置用户昵称
 *
 * @param {String} nickname
 */
export function setNickname(nickname) {
    return Cookies.set(NICK_NAME, nickname);
}


/**
 * 获取授权Nickname
 */
export function getNickname() {
    return Cookies.get(NICK_NAME) || '';
}


