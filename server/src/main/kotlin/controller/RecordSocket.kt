package controller

import config.EndpointContext
import org.apache.logging.log4j.Logger
import javax.websocket.*
import javax.websocket.server.ServerEndpoint

@ServerEndpoint("/record",configurator = EndpointContext::class)
class RecordSocket(log: Logger): Socket(log) {

    init {
        Share.log = log
    }

    @OnOpen
    fun open(session: Session){
        log.info("websocket connect successfully")
        map[session.id] = session

    }

    @OnMessage
    fun message(session: Session, message: String) {
        map[session.id] = session
        log.info(message)
    }

    @OnClose
    fun close(session: Session) {
        map.remove(session.id)

        for((k,v) in map) {
            if(k==session.id) {
                map.remove(k)
                break
            }
        }
    }

    @OnError
    fun error(session: Session, throwable: Throwable){
        map.remove(session.id)
        log.error("session ${session.id} close with exception $throwable")
    }
}