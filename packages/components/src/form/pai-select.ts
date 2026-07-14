import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

export interface PaiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * @summary A native `<select>`, styled like Bulma's `.select`. Options are provided via
 * the `options` property (rather than slotted `<option>`s) because native `<select>`
 * does not support slotting light-DOM options across a shadow boundary in most browsers.
 */
@customElement('pai-select')
export class PaiSelect extends FormAssociatedMixin(PaiElement) {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        font-family: var(--pai-font-family);
      }
      label {
        display: block;
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
        font-size: var(--pai-font-size-6);
        margin-bottom: var(--pai-space-2);
      }
      select {
        box-sizing: border-box;
        width: 100%;
        padding: calc(0.5em - 1px) 2em calc(0.5em - 1px) 0.75em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white);
        color: var(--pai-color-text);
        font: inherit;
        font-size: var(--pai-font-size-6);
      }
      select:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 1px;
      }
      select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  @property({ type: Array }) options: PaiSelectOption[] = [];
  @property() value = '';
  @property() name = '';
  @property() label = '';
  @property() placeholder = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value);
    }
  }

  private _onChange(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-change', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      ${this.label ? html`<label for="control">${this.label}</label>` : nothing}
      <select
        id="control"
        name=${this.name || nothing}
        ?disabled=${this.disabled}
        ?required=${this.required}
        .value=${this.value}
        @change=${this._onChange}
      >
        ${this.placeholder
          ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`
          : nothing}
        ${this.options.map(
          (option) => html`
            <option value=${option.value} ?disabled=${option.disabled} ?selected=${option.value === this.value}>
              ${option.label}
            </option>
          `,
        )}
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-select': PaiSelect;
  }
}
