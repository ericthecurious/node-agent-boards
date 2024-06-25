export default class GenerativeClientImpl implements GenerativeClient {
    public static Class?: new () => GenerativeClient

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface GenerativeClient {}
