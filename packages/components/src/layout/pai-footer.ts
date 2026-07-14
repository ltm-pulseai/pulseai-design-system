import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A page footer block with padding and a subtle background, like Bulma's `.footer`.
 * @slot - Footer content.
 */
@customElement('pai-footer')
export class PaiFooter extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        padding: var(--pai-space-6) var(--pai-space-4);
        background-color: var(--pai-color-white-bis);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-footer': PaiFooter;
  }
}
