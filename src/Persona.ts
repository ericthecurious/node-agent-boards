import GenerativeClientImpl, { GenerativeClient } from './GenerativeClient'

export default class PersonaImpl implements Persona {
    public static Class?: new (options: PersonaOptions) => Persona

    public readonly name?: string
    public readonly context?: string
    protected client: GenerativeClient

    protected constructor(options: PersonaOptions) {
        const { client, name, context } = options ?? {}

        this.client = client
        this.name = name
        this.context = context
    }

    public static Create(options?: Partial<PersonaOptions>) {
        const { client = this.Client(), name, context } = options ?? {}
        return new (this.Class ?? this)({ client, name, context })
    }

    public generate(prompt: string) {
        const contextPrompt = this.context
            ? `${this.context} ${prompt}`
            : prompt

        return this.client.generate(contextPrompt)
    }

    private static Client() {
        return GenerativeClientImpl.Create()
    }
}

export interface Persona {
    name?: string
    context?: string
    generate(prompt: string): string
}

export interface PersonaOptions {
    client: GenerativeClient
    name?: string
    context?: string
}
