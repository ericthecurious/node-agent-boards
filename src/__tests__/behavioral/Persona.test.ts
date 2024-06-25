import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import Persona from '../../Persona'

export default class PersonaTest extends AbstractSpruceTest {
    @test()
    protected static async canCreatePersona() {
        const persona = new Persona()
        assert.isTruthy(persona)
    }
}
