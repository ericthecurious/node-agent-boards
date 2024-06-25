import GenerativeClientImpl, { GenerativeClient } from './GenerativeClient'

export default class PersonaImpl implements Persona {
    public static Class?: new () => Persona

    public name?: string
    protected client?: GenerativeClient

    protected constructor(name?: string) {
        this.name = name
        this.client = this.Client()
    }

    public static Create(name?: string) {
        return new (this.Class ?? this)(name)
    }

    public generate(_prompt: string) {
        return ''
    }

    private Client() {
        return GenerativeClientImpl.Create()
    }
}

export interface Persona {
    name?: string
    generate(prompt: string): string
}
