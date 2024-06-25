import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import PersonaImpl from '../../Persona'

export default class PersonaTest extends AbstractSpruceTest {
    @test()
    protected static async canCreatePersona() {
        const persona = this.Persona()
        assert.isTruthy(persona)
    }

    @test()
    protected static async personaAcceptsName() {
        const name = generateId()
        const persona = this.Persona(name)
        assert.isEqual(persona.name, name)
    }

    private static Persona(name?: string) {
        return PersonaImpl.Create(name)
    }
}
