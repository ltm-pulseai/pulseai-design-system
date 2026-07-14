import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A generic spacing block — adds bottom margin between stacked elements,
 * like Bulma's `.block`. The last block in a sequence has no trailing margin.
 * @slot - Block content.
 */
@customElement('pai-block')
export class PaiBlock extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        margin-bottom: var(--pai-space-4);
      }
      :host(:last-child) {
        margin-bottom: 0;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-block': PaiBlock;
  }
}
