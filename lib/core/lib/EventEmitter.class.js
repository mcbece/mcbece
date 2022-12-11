import { each, asyncEach, AsyncFunction } from "@/util/index.js"

export class EventEmitter {
    constructor() {
        this._events = {}
    }
    on(eventName, listener) {
        if (listener instanceof AsyncFunction) {
            const _eventName = `${eventName}.async`
            if (this._events[_eventName]) this._events[_eventName].push(listener)
            else this._events[_eventName] = [ listener ]
        } else {
            if (this._events[eventName]) this._events[eventName].push(listener)
            else this._events[eventName] = [ listener ]
        }
        return this
    }
    once(eventName, listener) {
        if (listener instanceof AsyncFunction) {
            const _eventName = `${eventName}.async`
            const _listener = async (...args) => {
                await listener(...args)
                this.removeListener(_eventName, _listener)
            }
            if (this._events[_eventName]) this._events[_eventName].push(_listener)
            else this._events[_eventName] = [ _listener ]
        } else {
            const _listener = (...args) => {
                listener(...args)
                this.removeListener(eventName, _listener)
            }
            if (this._events[eventName]) this._events[eventName].push(_listener)
            else this._events[eventName] = [ _listener ]
        }
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
        return this.asyncEmit(eventName, ...args)
    }
    async asyncEmit(eventName, ...args) {
        const _eventName = `${eventName}.async`
        if (this._events[_eventName]) {
            await asyncEach(this._events[_eventName], async listener => await listener(...args))
        }
    }
    addListener(eventName, listener) {
        return this.on(eventName, listener)
    }
    off(eventName, listener) {
        return this.removeListener(eventName, listener)
    }
}

export default EventEmitter
