import GenerativeClient from '../../GenerativeClient'

export default class FakeGenerativeClient implements GenerativeClient {
    public wasInstantiated = false

    public constructor() {
        this.wasInstantiated = true
    }
}
