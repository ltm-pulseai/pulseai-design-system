import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiIconSize = 'small' | 'normal' | 'medium' | 'large';

/**
 * @summary A fixed-size container for an icon (SVG, font icon, image), like Bulma's `.icon`.
 * Purely decorative by default (`aria-hidden`); pass `label` when the icon conveys meaning on its own.
 * @slot - Icon markup (e.g. an inline `<svg>` or `<img>`).
 */
@customElement('pai-icon')
export class PaiIcon extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
      }
      :host([size='small']) {
        width: 1rem;
        height: 1rem;
      }
      :host([size='medium']) {
        width: 2rem;
        height: 2rem;
      }
      :host([size='large']) {
        width: 3rem;
        height: 3rem;
      }
      ::slotted(svg),
      ::slotted(img) {
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `,
  ];

  /** Icon box size. */
  @property({ reflect: true }) size: PaiIconSize = 'normal';

  /** Accessible name. Leave unset for a purely decorative icon (hidden from assistive tech). */
  @property() label?: string;

  render() {
    return html`
      <span role=${this.label ? 'img' : 'presentation'} aria-hidden=${this.label ? 'false' : 'true'} aria-label=${this.label || 'false'}>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-icon': PaiIcon;
  }
}
