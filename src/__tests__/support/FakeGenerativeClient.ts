import GenerativeClient from '../../GenerativeClient'

export default class FakeGenerativeClient implements GenerativeClient {
    public wasInstantiated = false
    public generateCalls: string[] = []

    public constructor() {
        this.wasInstantiated = true
    }

    public generate(prompt: string) {
        this.generateCalls.push(prompt)
        return ''
    }
}
