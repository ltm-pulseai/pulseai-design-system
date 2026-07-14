import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Layout wrapper for a form control with optional leading/trailing icons
 * and a loading state, like Bulma's `.control`.
 * @slot - The form control (e.g. `pai-input`).
 * @slot icon-left - Optional leading icon.
 * @slot icon-right - Optional trailing icon.
 */
@customElement('pai-control')
export class PaiControl extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--pai-space-2);
      }
      :host([loading])::after {
        content: '';
        width: 1em;
        height: 1em;
        border: 2px solid var(--pai-color-primary);
        border-right-color: transparent;
        border-radius: 50%;
        animation: pai-control-spin var(--pai-duration-slow, 300ms) linear infinite;
      }
      @keyframes pai-control-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  /** Shows a loading spinner after the control. */
  @property({ type: Boolean, reflect: true }) loading = false;

  render() {
    return html`
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-control': PaiControl;
  }
}
