import { Persona } from '../../Persona'

export default class FakePersona implements Persona {
    public constructor() {}

    public async generate() {
        return 'fake response'
    }
}
