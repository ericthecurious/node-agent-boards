import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import MeetingProtocolImpl from '../../MeetingProtocol'

export default class MeetingProtocolTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateMeetingProtocol() {
        const protocol = MeetingProtocolImpl.Create()
        assert.isTruthy(protocol)
    }
}
