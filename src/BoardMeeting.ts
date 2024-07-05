import { assertOptions } from '@sprucelabs/schema'
import Persona from './Persona'

export default class BoardMeetingImpl implements BoardMeeting {
    public static Class?: BoardMeetingConstructor

    protected personas: Persona[]

    protected constructor(options: BoardMeetingConstructorOptions) {
        const { personas } = options

        this.personas = personas
    }

    public static Create(options: BoardMeetingOptions) {
        const { personas } = assertOptions(options, ['personas'])
        return new (this.Class ?? this)({ personas })
    }

    public async commence() {
        await Promise.all(
            this.personas.map((persona) => persona.generate('fake prompt'))
        )
    }
}

export interface BoardMeeting {
    commence(): Promise<void>
}

export interface BoardMeetingOptions {
    personas: Persona[]
}

export interface BoardMeetingConstructorOptions {
    personas: Persona[]
}

export type BoardMeetingConstructor = new (
    options: BoardMeetingConstructorOptions
) => BoardMeeting
