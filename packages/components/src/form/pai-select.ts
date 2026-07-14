import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
        padding: calc(0.5em - 1px) 2em calc(0.5em - 1px) 0.85em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-surface);
        color: var(--pai-color-text);
        font: inherit;
        font-size: var(--pai-font-size-6);
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%237a7a7a' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.8em center;
        background-size: 0.7em;
        transition: border-color var(--pai-duration-fast) var(--pai-easing),
          box-shadow var(--pai-duration-fast) var(--pai-easing);
      }
      select:hover:not(:disabled) {
        border-color: var(--pai-color-grey-light);
      }
      select:focus-visible {
        outline: none;
        border-color: var(--pai-color-link);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-link) 20%, transparent);
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

  @query('#control') private _controlEl?: HTMLSelectElement;

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value);
    }
    if (this._controlEl) {
      this.internals.setValidity(
        this._controlEl.validity,
        this._controlEl.validationMessage,
        this._controlEl,
      );
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
