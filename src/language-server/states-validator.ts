import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { StatesAstType, State } from './generated/ast';
import { StatesServices } from './states-module';

/**
 * Map AST node types to validation checks.
 */
type StatesChecks = { [type in StatesAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class StatesValidationRegistry extends ValidationRegistry {
    constructor(services: StatesServices) {
        super(services);
        const validator = services.validation.StatesValidator;
        const checks: StatesChecks = {
            State: validator.checkStateStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class StatesValidator {

    checkStateStartsWithCapital(state: State, accept: ValidationAcceptor): void {
        if (state.name) {
            const firstChar = state.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'State name should start with a capital.', { node: state, property: 'name' });
            }
        }
	}

}
