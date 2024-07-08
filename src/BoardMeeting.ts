import { assertOptions } from '@sprucelabs/schema'
import { Persona } from './Persona'

export default class BoardMeetingImpl implements BoardMeeting {
    public static Class?: BoardMeetingConstructor

    protected personas: Persona[]
    private prompt: string

    protected constructor(options: BoardMeetingConstructorOptions) {
        const { personas, prompt = 'fake prompt' } = options

        this.personas = personas
        this.prompt = prompt
    }

    public static Create(options: BoardMeetingOptions) {
        const { personas, prompt } = assertOptions(options, ['personas'])
        return new (this.Class ?? this)({ personas, prompt })
    }

    public async commence() {
        await Promise.all(
            this.personas.map((persona) => persona.generate(this.prompt))
        )
    }
}

export interface BoardMeeting {
    commence(): Promise<void>
}

export interface BoardMeetingOptions {
    personas: Persona[]
    prompt?: string
}

export interface BoardMeetingConstructorOptions {
    personas: Persona[]
    prompt?: string
}

export type BoardMeetingConstructor = new (
    options: BoardMeetingConstructorOptions
) => BoardMeeting
