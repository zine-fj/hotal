/**
 * @description: 非空校验
 * @param {*} string
 * @return {*}
 */
function repIsEmpty(val) {
  var rep = /^\s*$/;
  if(rep.test(val) || val == undefined || val == null) {
      return true; // 空
  } else {
      return false; // 非空
  }
}
/**
 * @description: 手机号校验
 * @param {*} string
 * @return {*}
 */
function repCheckPhone(phone) {
  var rep = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return rep.test(phone);
}

export default {
  repIsEmpty,
  repCheckPhone
}