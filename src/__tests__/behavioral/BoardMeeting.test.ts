import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import BoardMeetingImpl from '../../BoardMeeting'

export default class BoardMeetingTest extends AbstractSpruceTest {
    @test()
    protected static async canCreateBoardMeeting() {
        const instance = this.BoardMeeting()
        assert.isTruthy(instance)
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = assert.doesThrow(() => BoardMeetingImpl.Create({}))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['personas'],
        })
    }

    private static BoardMeeting() {
        return BoardMeetingImpl.Create({ personas: [] })
    }
}
