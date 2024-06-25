import PersonaImpl, { PersonaOptions } from '../../Persona'

export default class SpyPersona extends PersonaImpl {
    public constructor(options: PersonaOptions) {
        super(options)
    }

    public getClient() {
        return this.client
    }
}
