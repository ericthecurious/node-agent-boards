import PersonaImpl from '../../Persona'

export default class SpyPersona extends PersonaImpl {
    public constructor(name?: string) {
        super(name)
    }

    public getClient() {
        return this.client
    }
}
