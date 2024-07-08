import { Persona } from '../../Persona'

export default class FakePersona implements Persona {
    public numGenerateCalls = 0
    public lastGenerateCall?: string

    public constructor() {}

    public async generate(prompt: string) {
        this.lastGenerateCall = prompt
        this.numGenerateCalls++
        return 'fake response'
    }
}
