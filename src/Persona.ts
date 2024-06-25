export default class PersonaImpl implements Persona {
    public static Class?: new () => Persona

    public name?: string

    protected constructor(name?: string) {
        this.name = name
    }

    public static Create(name?: string): Persona {
        return new (this.Class ?? this)(name)
    }

    public generate(_prompt: string) {
        return ''
    }
}

export interface Persona {
    name?: string
    generate(prompt: string): string
}
