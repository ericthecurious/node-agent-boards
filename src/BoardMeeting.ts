import { assertOptions } from '@sprucelabs/schema'
import Persona from './Persona'

export default class BoardMeetingImpl implements BoardMeeting {
    public static Class?: new () => BoardMeeting

    protected constructor() {}

    public static Create(options: BoardMeetingOptions) {
        assertOptions(options, ['personas'])
        return new (this.Class ?? this)()
    }
}

export interface BoardMeeting {}

export interface BoardMeetingOptions {
    personas: Persona[]
}
