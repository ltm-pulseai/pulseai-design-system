import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiSectionSize = 'normal' | 'medium' | 'large';

/**
 * @summary A page section with generous vertical padding, like Bulma's `.section`.
 * @slot - Section content.
 */
@customElement('pai-section')
export class PaiSection extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        padding: var(--pai-space-6) var(--pai-space-4);
      }
      :host([size='medium']) {
        padding: 6rem 1.5rem;
      }
      :host([size='large']) {
        padding: 9rem 1.5rem;
      }
    `,
  ];

  /** Vertical padding scale. */
  @property({ reflect: true }) size: PaiSectionSize = 'normal';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-section': PaiSection;
  }
}
