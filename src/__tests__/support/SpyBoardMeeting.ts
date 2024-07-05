import BoardMeetingImpl, {
    BoardMeetingConstructorOptions,
} from '../../BoardMeeting'

export default class SpyBoardMeeting extends BoardMeetingImpl {
    public constructor(options: BoardMeetingConstructorOptions) {
        super(options)
    }

    public getPersonas() {
        return this.personas
    }
}
