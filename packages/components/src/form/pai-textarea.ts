import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

/**
 * @summary A multi-line text input, like Bulma's `.textarea`. Label, control, and
 * help/error text all live in one shadow root for correct native association.
 * @fires pai-input - Fired on every keystroke, with the current value in `event.detail.value`.
 * @fires pai-change - Fired on commit (blur), with the current value in `event.detail.value`.
 */
@customElement('pai-textarea')
export class PaiTextarea extends FormAssociatedMixin(PaiElement) {
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
      textarea {
        box-sizing: border-box;
        width: 100%;
        padding: calc(0.5em - 1px) 0.75em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white);
        color: var(--pai-color-text);
        font: inherit;
        font-size: var(--pai-font-size-6);
        resize: vertical;
      }
      textarea:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 1px;
      }
      textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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

  @property() value = '';
  @property() placeholder = '';
  @property() name = '';
  @property() label = '';
  @property({ attribute: 'help-text' }) helpText = '';
  @property({ attribute: 'error-text' }) errorText = '';
  @property({ type: Number }) rows = 4;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) required = false;

  updated(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      this.internals.setFormValue(this.value);
    }
  }

  private _onInput(event: InputEvent) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-input', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  private _onChange(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-change', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  render() {
    const describedBy = this.errorText || this.helpText ? 'desc' : nothing;
    return html`
      ${this.label ? html`<label for="control">${this.label}</label>` : nothing}
      <textarea
        id="control"
        rows=${this.rows}
        placeholder=${this.placeholder || nothing}
        name=${this.name || nothing}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?required=${this.required}
        aria-invalid=${this.errorText ? 'true' : nothing}
        aria-describedby=${describedBy}
        @input=${this._onInput}
        @change=${this._onChange}
        .value=${this.value}
      ></textarea>
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
    'pai-textarea': PaiTextarea;
  }
}
