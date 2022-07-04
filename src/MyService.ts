export class MyService {
    constructor() { }
    public printDateTime(): String {
        return new Date().toISOString()
    }
}