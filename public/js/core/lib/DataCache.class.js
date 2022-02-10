export class DataCache {
    constructor(maxLenght) {
        this.maxLenght = maxLenght
        this.data = []
    }
    push(name, data) {
        
        //console.log(this.some(name))
        
        if (!this.some(name)) {
            this.data.push([name, data])
            this.data = this.data.slice(0, this.maxLenght)
            
            //console.log({cacheData: this.data})
            
            return true
        } else return false
    }
    some(name) {
        
        console.log(name, this.data)
        
        return this.data.some(([_name]) => _name === name)
    }
    find(name) {
        return this.data.find(([_name]) => _name === name)
    }
}