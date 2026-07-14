import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

export type PaiInputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type PaiInputColor = 'default' | 'success' | 'danger';

/**
 * @summary A single-line text input, like Bulma's `.input`. Label, control, and help/error
 * text all live in one shadow root, so native id-based association (`for`/`aria-describedby`)
 * works correctly without the cross-shadow-boundary limitations of composed field layouts.
 * @fires pai-input - Fired on every keystroke, with the current value in `event.detail.value`.
 * @fires pai-change - Fired on commit (blur/Enter), with the current value in `event.detail.value`.
 */
@customElement('pai-input')
export class PaiInput extends FormAssociatedMixin(PaiElement) {
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
      input {
        box-sizing: border-box;
        width: 100%;
        padding: calc(0.5em - 1px) 0.85em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-surface);
        color: var(--pai-color-text);
        font: inherit;
        font-size: var(--pai-font-size-6);
        transition: border-color var(--pai-duration-fast) var(--pai-easing),
          box-shadow var(--pai-duration-fast) var(--pai-easing);
      }
      input:hover:not(:disabled) {
        border-color: var(--pai-color-grey-light);
      }
      input:focus-visible {
        outline: none;
        border-color: var(--pai-color-link);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-link) 20%, transparent);
      }
      input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host([color='success']) input {
        border-color: var(--pai-color-success);
      }
      :host([color='success']) input:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-success) 20%, transparent);
      }
      :host([color='danger']) input {
        border-color: var(--pai-color-danger);
      }
      :host([color='danger']) input:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-danger) 20%, transparent);
      }
      .help {
        margin-top: var(--pai-space-1);
        font-size: var(--pai-font-size-7);
        color: var(--pai-color-grey);
      }
      .help.danger {
        color: var(--pai-color-danger);
      }
    `,
  ];

  /** Native input type. */
  @property({ reflect: true }) type: PaiInputType = 'text';

  /** Current value. */
  @property() value = '';

  @property() placeholder = '';

  @property() name = '';

  /** Accessible label, rendered above the input and associated via `for`/`id`. */
  @property() label = '';

  /** Help text shown below the input when there is no `errorText`. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** Error text — takes precedence over `helpText` and sets `aria-invalid`. */
  @property({ attribute: 'error-text' }) errorText = '';

  /** Visual validation color. */
  @property({ reflect: true }) color: PaiInputColor = 'default';

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;

  @query('#control') private _controlEl?: HTMLInputElement;

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

  private _onInput(event: InputEvent) {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-input', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  private _onChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-change', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  render() {
    const describedBy = this.errorText || this.helpText ? 'desc' : nothing;
    return html`
      ${this.label ? html`<label for="control">${this.label}</label>` : nothing}
      <input
        id="control"
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder || nothing}
        name=${this.name || nothing}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        aria-invalid=${this.errorText ? 'true' : nothing}
        aria-describedby=${describedBy}
        @input=${this._onInput}
        @change=${this._onChange}
      />
      ${this.errorText
        ? html`<div id="desc" class="help danger">${this.errorText}</div>`
        : this.helpText
          ? html`<div id="desc" class="help">${this.helpText}</div>`
          : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-input': PaiInput;
  }
}
