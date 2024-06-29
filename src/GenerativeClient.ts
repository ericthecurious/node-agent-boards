import { assertOptions } from '@sprucelabs/schema'

export default class GenerativeClientImpl implements GenerativeClient {
    public static Class?: new () => GenerativeClient

    protected constructor(options: GenerativeClientOptions) {
        assertOptions(options, ['clientUrl', 'apiKey'])
    }

    public static Create(options: GenerativeClientOptions) {
        return new (this.Class ?? this)(options)
    }

    public generate(_prompt: string) {
        return ''
    }
}

export interface GenerativeClient {
    generate(prompt: string): string
}

export interface GenerativeClientOptions {
    clientUrl: string
    apiKey: string
}
