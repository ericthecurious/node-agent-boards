export default class MeetingProtocolImpl implements MeetingProtocol {
    public static Class?: new () => MeetingProtocol

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface MeetingProtocol {}
