import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

/**
 * @summary A radio button, like Bulma's `.radio`. Wraps a native `<input type="radio">`
 * in a `<label>` for implicit association. Since each instance has its own shadow root,
 * native browser grouping doesn't apply across instances — this component manually
 * enforces mutual exclusivity among same-`name` siblings in its root on check.
 * @slot - Label text next to the radio.
 * @fires pai-change - Fired when this radio becomes checked, with `event.detail.value`.
 */
@customElement('pai-radio')
export class PaiRadio extends FormAssociatedMixin(PaiElement) {
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
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true }) name = '';
  @property() value = '';

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked') && this.checked) {
      this.internals.setFormValue(this.value);
      this._uncheckSiblings();
    }
  }

  private _uncheckSiblings() {
    if (!this.name) return;
    const root = this.getRootNode() as ParentNode;
    root.querySelectorAll<PaiRadio>(`pai-radio[name="${this.name}"]`).forEach((el) => {
      if (el !== this) el.checked = false;
    });
  }

  private _onChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    if (this.checked) {
      this.dispatchEvent(
        new CustomEvent('pai-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    return html`
      <label>
        <input
          type="radio"
          name=${this.name || 'pai-radio-group'}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-radio': PaiRadio;
  }
}
