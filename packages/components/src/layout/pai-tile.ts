import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiTileVariant = 'ancestor' | 'parent' | 'child';

/**
 * @summary A single level of Bulma's tile grid system for nesting flexible, multi-directional layouts.
 * @slot - Nested `pai-tile` elements or content.
 */
@customElement('pai-tile')
export class PaiTile extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        flex: 1;
      }
      :host([variant='ancestor']) {
        display: flex;
        flex-wrap: wrap;
        gap: var(--pai-space-3);
      }
      :host([variant='parent']) {
        display: flex;
        flex-direction: column;
        gap: var(--pai-space-3);
      }
      :host([vertical]) {
        flex-direction: column;
      }
      :host([size='1']) {
        flex: none;
        width: 8.3333%;
      }
      :host([size='2']) {
        flex: none;
        width: 16.6667%;
      }
      :host([size='3']) {
        flex: none;
        width: 25%;
      }
      :host([size='4']) {
        flex: none;
        width: 33.3333%;
      }
      :host([size='6']) {
        flex: none;
        width: 50%;
      }
      :host([size='8']) {
        flex: none;
        width: 66.6667%;
      }
      :host([size='12']) {
        flex: none;
        width: 100%;
      }
    `,
  ];

  /** Level of nesting: `ancestor` wraps the whole grid, `parent` groups children, `child` is a leaf. */
  @property({ reflect: true }) variant: PaiTileVariant = 'child';

  /** Stacks a parent tile's children vertically instead of horizontally. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  /** Width as a fraction of 12 columns (e.g. `4` = one third). */
  @property({ reflect: true }) size?: string;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tile': PaiTile;
  }
}
