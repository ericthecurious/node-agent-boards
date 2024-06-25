import GenerativeClientImpl, { GenerativeClient } from './GenerativeClient'

export default class PersonaImpl implements Persona {
    public static Class?: new (options: PersonaOptions) => Persona

    public name?: string
    protected client: GenerativeClient

    protected constructor(options: PersonaOptions) {
        const { name, client } = options ?? {}

        this.name = name
        this.client = client
    }

    public static Create(options?: Partial<PersonaOptions>) {
        const { name, client = this.Client() } = options ?? {}
        return new (this.Class ?? this)({ name, client })
    }

    public generate(_prompt: string) {
        return ''
    }

    private static Client() {
        return GenerativeClientImpl.Create()
    }
}

export interface Persona {
    name?: string
    generate(prompt: string): string
}

export interface PersonaOptions {
    client: GenerativeClient
    name?: string
}
