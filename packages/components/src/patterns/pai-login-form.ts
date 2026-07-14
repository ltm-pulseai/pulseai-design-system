import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import '../form/pai-input.js';
import '../form/pai-checkbox.js';
import '../elements/pai-button.js';
import '../elements/pai-title.js';
import type { PaiInput } from '../form/pai-input.js';
import type { PaiCheckbox } from '../form/pai-checkbox.js';

/**
 * @summary A complete sign-in form — an organism composed from `pai-input`, `pai-checkbox`,
 * and `pai-button`, showing how molecules/elements assemble into a real page section.
 * @fires pai-submit - Fired on submit with `{ email, password, remember }`, after
 * `checkValidity()` passes on both inputs. Cancelable — the form does not reset itself.
 */
@customElement('pai-login-form')
export class PaiLoginForm extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        max-width: 24rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: var(--pai-space-4);
      }
      pai-title {
        margin-bottom: var(--pai-space-2);
      }
      .error {
        color: var(--pai-color-danger);
        font-size: var(--pai-font-size-7);
      }
    `,
  ];

  /** Heading text shown above the form. Leave empty to omit. */
  @property() heading = 'Sign in';

  /** Submit button label. */
  @property({ attribute: 'submit-label' }) submitLabel = 'Sign in';

  /** Top-level error message (e.g. "Invalid credentials") shown above the fields. */
  @property() error = '';

  @query('#email') private _email!: PaiInput;
  @query('#password') private _password!: PaiInput;
  @query('#remember') private _remember!: PaiCheckbox;

  private _onSubmit(event: Event) {
    event.preventDefault();
    if (!this._email.checkValidity() || !this._password.checkValidity()) {
      this._email.reportValidity();
      this._password.reportValidity();
      return;
    }
    this.dispatchEvent(
      new CustomEvent('pai-submit', {
        detail: {
          email: this._email.value,
          password: this._password.value,
          remember: this._remember.checked,
        },
        bubbles: true,
        composed: true,
        cancelable: true,
      }),
    );
  }

  render() {
    return html`
      <form novalidate @submit=${this._onSubmit}>
        ${this.heading ? html`<pai-title .level=${2} size="4">${this.heading}</pai-title>` : nothing}
        ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}
        <pai-input id="email" type="email" label="Email" name="email" required></pai-input>
        <pai-input id="password" type="password" label="Password" name="password" required></pai-input>
        <pai-checkbox id="remember" name="remember">Remember me</pai-checkbox>
        <pai-button type="submit" color="primary" full-width>${this.submitLabel}</pai-button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-login-form': PaiLoginForm;
  }
}
