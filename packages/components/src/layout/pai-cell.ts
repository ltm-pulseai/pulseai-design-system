import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A single cell inside a `pai-grid`, optionally spanning multiple columns/rows.
 * @slot - Cell content.
 */
@customElement('pai-cell')
export class PaiCell extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
  ];

  /** Number of grid columns this cell spans. */
  @property({ type: Number, attribute: 'col-span' }) colSpan?: number;

  /** Number of grid rows this cell spans. */
  @property({ type: Number, attribute: 'row-span' }) rowSpan?: number;

  willUpdate() {
    if (this.colSpan) {
      this.style.gridColumn = `span ${this.colSpan}`;
    }
    if (this.rowSpan) {
      this.style.gridRow = `span ${this.rowSpan}`;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-cell': PaiCell;
  }
}
