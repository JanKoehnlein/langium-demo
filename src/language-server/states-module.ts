import { createDefaultModule, DefaultModuleContext, inject, LangiumServices, Module, PartialLangiumServices } from 'langium';
import { StatesGeneratedModule } from './generated/module';
import { StatesValidationRegistry, StatesValidator } from './states-validator';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type StatesAddedServices = {
    validation: {
        StatesValidator: StatesValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type StatesServices = LangiumServices & StatesAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const StatesModule: Module<StatesServices, PartialLangiumServices & StatesAddedServices> = {
    validation: {
        ValidationRegistry: (injector) => new StatesValidationRegistry(injector),
        StatesValidator: () => new StatesValidator()
    }
};

/**
 * Inject the full set of language services by merging three modules:
 *  - Langium default services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 */
export function createStatesServices(context?: DefaultModuleContext): StatesServices {
    return inject(
        createDefaultModule(context),
        StatesGeneratedModule,
        StatesModule
    );
}
