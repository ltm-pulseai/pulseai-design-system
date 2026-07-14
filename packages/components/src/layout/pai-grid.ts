import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A CSS Grid container that auto-fills responsive cells, like Bulma's newer `.grid`.
 * @slot - `pai-cell` elements or any grid children.
 */
@customElement('pai-grid')
export class PaiGrid extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: grid;
        gap: var(--pai-space-4);
        grid-template-columns: repeat(auto-fill, minmax(var(--pai-grid-min-col-width, 9rem), 1fr));
      }
      :host([fixed-columns]) {
        grid-template-columns: repeat(var(--pai-grid-columns, 4), 1fr);
      }
    `,
  ];

  /** Minimum column width for the auto-fill track (CSS length, e.g. `12rem`). */
  @property({ attribute: 'min-col-width' }) minColWidth?: string;

  /** Number of fixed columns instead of responsive auto-fill. */
  @property({ type: Number, attribute: 'fixed-columns', reflect: true }) fixedColumns?: number;

  willUpdate() {
    if (this.minColWidth) {
      this.style.setProperty('--pai-grid-min-col-width', this.minColWidth);
    }
    if (this.fixedColumns) {
      this.style.setProperty('--pai-grid-columns', String(this.fixedColumns));
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-grid': PaiGrid;
  }
}
