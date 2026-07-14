import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A flexbox row that lays out `pai-column` children, like Bulma's `.columns`.
 * @slot - `pai-column` elements.
 */
@customElement('pai-columns')
export class PaiColumns extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      ::slotted(pai-column) {
        padding: var(--pai-space-3);
      }
      :host([gapless]) ::slotted(pai-column) {
        padding: 0;
      }
      :host([vcentered]) {
        align-items: center;
      }
      :host([centered]) {
        justify-content: center;
      }
    `,
  ];

  /** Removes the gap between columns. */
  @property({ type: Boolean, reflect: true }) gapless = false;

  /** Vertically centers columns of differing heights. */
  @property({ type: Boolean, reflect: true }) vcentered = false;

  /** Centers columns horizontally when they don't fill the row. */
  @property({ type: Boolean, reflect: true }) centered = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-columns': PaiColumns;
  }
}
