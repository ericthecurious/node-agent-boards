export default class BoardMeetingImpl implements BoardMeeting {
    public static Class?: new () => BoardMeeting

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface BoardMeeting {}
