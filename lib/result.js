/*
 * @Author: liweilong
 * @Date: 2020-11-25 10:00:45
 */
/**
 * 一个用于返回给用户状态信息
 */

const result = {
  ok_code: 200,
  paramserror: 400,
  unautherror: 401,
  mehtoderror: 105,
  servererror: 500,

  response(code = this.ok_code, msg = '', data = null) {
    return {
      code,
      msg,
      data
    }
  },

  back(data) {
    return this.response(code = this.ok_code, msg = '', data)
  },

  ok(msg = '') {
    return this.response(code = this.ok_code, msg)
  },

  params_error(msg = '', data = null) {
    return this.response(code = this.paramserror, msg, data)
  },

  unauth(msg = '', data = null) {
    return this.response(code = this.unautherror, msg, data)
  },

  method_error(msg = '', data = null) {
    return this.response(code = this.mehtoderror, msg, data)
  },

  server_parror(msg = '', data = null) {
    return this.response(code = this.servererror, msg, data)
  }

}


module.exports = result