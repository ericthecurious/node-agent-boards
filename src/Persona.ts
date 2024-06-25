export default class PersonaImpl implements Persona {
    public static Class?: new () => Persona

    public name?: string

    protected constructor(name?: string) {
        this.name = name
    }

    public static Create(name?: string): Persona {
        return new (this.Class ?? this)(name)
    }
}

export interface Persona {
    name?: string
}
