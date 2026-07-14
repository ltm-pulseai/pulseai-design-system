import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

const SIZE_PERCENT: Record<string, string> = {
  full: '100%',
  'four-fifths': '80%',
  'three-quarters': '75%',
  'two-thirds': '66.6667%',
  'three-fifths': '60%',
  half: '50%',
  'two-fifths': '40%',
  'one-third': '33.3333%',
  'one-quarter': '25%',
  'one-fifth': '20%',
  '1': '8.3333%',
  '2': '16.6667%',
  '3': '25%',
  '4': '33.3333%',
  '5': '41.6667%',
  '6': '50%',
  '7': '58.3333%',
  '8': '66.6667%',
  '9': '75%',
  '10': '83.3333%',
  '11': '91.6667%',
  '12': '100%',
};

/**
 * @summary A flexible column inside a `pai-columns` row, like Bulma's `.column`.
 * @slot - Column content.
 */
@customElement('pai-column')
export class PaiColumn extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        flex: 1 1 0%;
        min-width: 0;
      }
      :host([narrow]) {
        flex: none;
        width: auto;
      }
    `,
  ];

  /**
   * Fixed width as a Bulma-style keyword (`half`, `one-third`, ...) or a
   * fraction of 12 (`1`–`12`). Leave unset for an equal-width flexible column.
   */
  @property() size?: string;

  /** Shrinks the column to fit its content instead of stretching. */
  @property({ type: Boolean, reflect: true }) narrow = false;

  willUpdate() {
    const width = this.size ? SIZE_PERCENT[this.size] : undefined;
    if (width) {
      this.style.flex = `none`;
      this.style.width = width;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-column': PaiColumn;
  }
}
