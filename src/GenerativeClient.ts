export default class GenerativeClientImpl implements GenerativeClient {
    public static Class?: new () => GenerativeClient

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public generate(_prompt: string) {
        return ''
    }
}

export interface GenerativeClient {
    generate(prompt: string): string
}
