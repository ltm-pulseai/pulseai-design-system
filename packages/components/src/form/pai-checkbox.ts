import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

/**
 * @summary A checkbox, like Bulma's `.checkbox`. Wraps a native `<input type="checkbox">`
 * in a `<label>` for implicit association, so keyboard/AT behavior is fully native.
 * @slot - Label text next to the checkbox.
 * @fires pai-change - Fired when the checked state changes, with `event.detail.checked`.
 */
@customElement('pai-checkbox')
export class PaiCheckbox extends FormAssociatedMixin(PaiElement) {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
        font-family: var(--pai-font-family);
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: var(--pai-space-2);
        cursor: pointer;
      }
      input {
        width: 1.1em;
        height: 1.1em;
        accent-color: var(--pai-color-primary);
      }
      input:disabled {
        cursor: not-allowed;
      }
      label:has(input:disabled) {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property() name = '';
  @property() value = 'on';

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked')) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }
    const input = this.shadowRoot?.querySelector('input');
    if (input) {
      input.indeterminate = this.indeterminate;
    }
  }

  private _onChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(
      new CustomEvent('pai-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    // A host-level aria-label (common when there's no slotted label text, e.g. a
    // table's row-select checkbox) can't cross the shadow boundary to name this
    // input on its own — forward it explicitly so the input has a real accessible name.
    const hostLabel = this.getAttribute('aria-label');
    return html`
      <label>
        <input
          type="checkbox"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-label=${hostLabel ?? nothing}
          @change=${this._onChange}
        />
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-checkbox': PaiCheckbox;
  }
}
