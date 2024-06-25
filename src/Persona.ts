import GenerativeClientImpl, { GenerativeClient } from './GenerativeClient'

export default class PersonaImpl implements Persona {
    public static Class?: new (options: PersonaOptions) => Persona

    public readonly name?: string
    public readonly context?: string
    public readonly corpus?: string[]
    protected client: GenerativeClient

    protected constructor(options: PersonaOptions) {
        const { client, name, context, corpus } = options ?? {}

        this.client = client
        this.name = name
        this.context = context
        this.corpus = corpus
    }

    public static Create(options?: Partial<PersonaOptions>) {
        const { client = this.Client(), name, context, corpus } = options ?? {}
        return new (this.Class ?? this)({ client, name, context, corpus })
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
    corpus?: string[]
    generate(prompt: string): string
}

export interface PersonaOptions {
    client: GenerativeClient
    name?: string
    context?: string
    corpus?: string[]
}
