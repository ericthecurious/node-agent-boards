import AbstractSpruceTest, {
    test,
    assert,
    generateId,
} from '@sprucelabs/test-utils'
import PersonaImpl, { Persona } from '../../Persona'

export default class PersonaTest extends AbstractSpruceTest {
    private static persona: Persona

    protected static async beforeEach() {
        await super.beforeEach()
        this.persona = this.Persona()
    }

    @test()
    protected static async canCreatePersona() {
        assert.isTruthy(this.persona)
    }

    @test()
    protected static async staticCreationMethodAcceptsName() {
        const name = generateId()
        const persona = this.Persona(name)
        assert.isEqual(persona.name, name)
    }

    @test()
    protected static async generateAcceptsAndReturnsTypeString() {
        const prompt = generateId()
        const result = this.persona.generate(prompt)
        assert.isString(result)
    }

    private static Persona(name?: string) {
        return PersonaImpl.Create(name)
    }
}
