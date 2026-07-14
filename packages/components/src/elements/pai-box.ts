import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A white, padded, shadowed container, like Bulma's `.box`.
 * @slot - Box content.
 */
@customElement('pai-box')
export class PaiBox extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        backdrop-filter: var(--pai-surface-backdrop-filter);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-normal);
        padding: var(--pai-space-5);
        color: var(--pai-color-text);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-box': PaiBox;
  }
}
