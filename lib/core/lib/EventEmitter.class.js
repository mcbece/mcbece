import { each } from "@/util/index.js"

export class EventEmitter {
    constructor() {
        this._events = {}
    }
    on(eventName, listener) {
        if (this._events[eventName]) this._events[eventName].push(listener)
        else this._events[eventName] = [ listener ]
        return this
    }
    once() {
        const _listener = (...args) => {
            listener(...args)
            this.removeListener(eventName, listener)
        }
        if (this._events[eventName]) this._events[eventName].push(_listener)
        else this._events[eventName] = [ _listener ]
        return this
    }
    removeListener(eventName, listener) {
        if (this._events[eventName]) {
            const newListeners = []
            each(this._events[eventName], _listener => {
                if (_listener !== listener) newListeners.push(_listener)
            })
            this._events[eventName] = newListeners
        }
        return this
    }
    emit(eventName, ...args) {
        if (this._events[eventName]) {
            each(this._events[eventName], listener => listener(...args))
        }
        return true
    }
    
    addListener(eventName, listener) {
        return this.on(eventName, listener)
    }
    off(eventName, listener) {
        return this.removeListener(eventName, listener)
    }
}

export default EventEmitter
