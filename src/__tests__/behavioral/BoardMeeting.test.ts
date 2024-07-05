import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
} from '@sprucelabs/test-utils'
import BoardMeetingImpl, { BoardMeeting } from '../../BoardMeeting'

export default class BoardMeetingTest extends AbstractSpruceTest {
    private static instance: BoardMeeting

    protected static async beforeEach() {
        await super.beforeEach()

        this.instance = this.BoardMeeting()
    }

    @test()
    protected static async canCreateBoardMeeting() {
        assert.isTruthy(this.instance)
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
