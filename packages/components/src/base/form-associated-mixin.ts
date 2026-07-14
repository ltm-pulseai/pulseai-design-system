import type { LitElement } from 'lit';
import type { Constructor } from './constructor.js';

/**
 * Adds native <form> participation to a Lit element via ElementInternals.
 * Consumers set `static formAssociated = true` on the final class and call
 * `this.internals.setFormValue(value)` whenever their value changes.
 */
export declare class FormAssociatedInterface {
  readonly internals: ElementInternals;
  get form(): HTMLFormElement | null;
  get validity(): ValidityState;
  get validationMessage(): string;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

export const FormAssociatedMixin = <T extends Constructor<LitElement>>(
  superClass: T,
): T & Constructor<FormAssociatedInterface> => {
  class FormAssociatedElement extends superClass {
    static formAssociated = true;

    readonly internals: ElementInternals;

    constructor(...args: any[]) {
      super(...args);
      this.internals = (this as unknown as HTMLElement).attachInternals();
    }

    get form(): HTMLFormElement | null {
      return this.internals.form;
    }

    get validity(): ValidityState {
      return this.internals.validity;
    }

    get validationMessage(): string {
      return this.internals.validationMessage;
    }

    checkValidity(): boolean {
      return this.internals.checkValidity();
    }

    reportValidity(): boolean {
      return this.internals.reportValidity();
    }
  }

  return FormAssociatedElement as unknown as T & Constructor<FormAssociatedInterface>;
};
