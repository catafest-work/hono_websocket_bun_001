export class WebSocketHelper {
    constructor(url) {
        this.url = url
        this.ws = null
    }

    connect() {
        return new Promise((resolve) => {
            this.ws = new WebSocket(this.url)
            this.ws.onopen = () => resolve(this.ws)
        })
    }

    disconnect() {
        if (this.ws) {
            this.ws.close()
        }
    }

    sendMessage(message) {
        this.ws.send(message)
    }
}
