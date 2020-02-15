package message

import org.springframework.http.HttpStatus

typealias StatusCode = org.springframework.http.HttpStatus

/**
 * @author ourfor
 * @date Feb 14, 2020
 * @property code return http status code
 * @property msg human-readable message
 * @property data the data client request
 * @description almost response is json, like {"code": 200,"msg": "success",data: ""}
 */
open class Message() {
    var code: Int = StatusCode.OK.value()
    var msg: String = "default message"
    var data: Any? = null

    constructor(code: Int, msg: String, data: Any?): this() {
        this.code = code
        this.msg = msg
        this.data = data
    }

    // add chain call
    fun setCode(code: Int): Message {
        this.code = code
        return this
    }

    fun setCode(httpStatus: HttpStatus): Message {
        this.code = httpStatus.value()
        return this
    }

    fun setMsg(msg: String): Message {
        this.msg = msg
        return this
    }

    fun setMsg(httpStatus: HttpStatus): Message {
        this.msg = httpStatus.reasonPhrase
        return this
    }

    fun setData(data: Any?): Message {
        this.data = data
        return this
    }

}