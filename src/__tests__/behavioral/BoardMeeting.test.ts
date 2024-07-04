import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import BoardMeetingImpl from '../../BoardMeeting'

export default class BoardMeetingTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateBoardMeeting() {
        const instance = BoardMeetingImpl.Create()
        assert.isTruthy(instance)
    }
}
