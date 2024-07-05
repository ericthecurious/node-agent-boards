import { Persona } from '../../Persona'

export default class FakePersona implements Persona {
    public numGenerateCalls = 0

    public constructor() {}

    public async generate() {
        this.numGenerateCalls++
        return 'fake response'
    }
}
