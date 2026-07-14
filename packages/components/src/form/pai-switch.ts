import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

/**
 * @summary A toggle switch, styled like a checkbox but visually a switch. Wraps a
 * native `<input type="checkbox" role="switch">` in a `<label>` for implicit association.
 * @slot - Label text next to the switch.
 * @fires pai-change - Fired when the checked state changes, with `event.detail.checked`.
 */
@customElement('pai-switch')
export class PaiSwitch extends FormAssociatedMixin(PaiElement) {
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
      .track {
        position: relative;
        width: 2.5em;
        height: 1.4em;
        border-radius: var(--pai-radius-rounded);
        background-color: var(--pai-color-grey-lighter);
        transition: background-color var(--pai-duration-fast) var(--pai-easing);
      }
      .track::after {
        content: '';
        position: absolute;
        top: 0.15em;
        left: 0.15em;
        width: 1.1em;
        height: 1.1em;
        border-radius: 50%;
        background-color: var(--pai-color-white);
        transition: transform var(--pai-duration-fast) var(--pai-easing);
      }
      input:checked ~ .track {
        background-color: var(--pai-color-primary);
      }
      input:checked ~ .track::after {
        transform: translateX(1.1em);
      }
      input:focus-visible ~ .track {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
      }
      input {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
      label:has(input:disabled) {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() name = '';
  @property() value = 'on';

  updated(changed: Map<string, unknown>) {
    if (changed.has('checked')) {
      this.internals.setFormValue(this.checked ? this.value : null);
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
    return html`
      <label>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <span class="track" aria-hidden="true"></span>
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-switch': PaiSwitch;
  }
}
