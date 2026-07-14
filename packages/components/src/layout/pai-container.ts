import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Centers content and constrains its width at each breakpoint, like Bulma's `.container`.
 * @slot - Container content.
 */
@customElement('pai-container')
export class PaiContainer extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
        margin: 0 auto;
        padding-left: var(--pai-space-4);
        padding-right: var(--pai-space-4);
      }
      @media (min-width: 1024px) {
        :host {
          max-width: 960px;
        }
      }
      @media (min-width: 1216px) {
        :host {
          max-width: 1152px;
        }
      }
      @media (min-width: 1408px) {
        :host {
          max-width: 1344px;
        }
      }
      :host([fluid]) {
        max-width: none;
      }
    `,
  ];

  /** Ignores breakpoint max-widths and stretches to fill its parent. */
  @property({ type: Boolean, reflect: true }) fluid = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-container': PaiContainer;
  }
}
