import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Styles a slotted native `<table>` like Bulma's `.table`. Keeping the
 * table itself in light DOM preserves native `<table>`/`<th>`/`<caption>` semantics.
 * @slot - A native `<table>` element.
 */
@customElement('pai-table')
export class PaiTable extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        overflow-x: auto;
      }
      ::slotted(table) {
        width: 100%;
        border-collapse: collapse;
        color: var(--pai-color-text);
      }
      ::slotted(table) :is(th, td) {
        padding: 0.5em 0.75em;
        border: 1px solid var(--pai-color-border);
        vertical-align: top;
      }
      ::slotted(table) th {
        color: var(--pai-color-text-strong);
        text-align: left;
      }
      :host([bordered]) ::slotted(table) :is(th, td) {
        border-width: 1px;
      }
      :host(:not([bordered])) ::slotted(table) :is(th, td) {
        border-width: 0 0 1px 0;
      }
      :host([narrow]) ::slotted(table) :is(th, td) {
        padding: 0.25em 0.5em;
      }
      :host([fullwidth]) ::slotted(table) {
        width: 100%;
      }
    `,
  ];

  /** Adds full cell borders instead of just row separators. */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** Alternates row background colors. Applied via the `striped` part on odd rows in light DOM CSS. */
  @property({ type: Boolean, reflect: true }) striped = false;

  /** Highlights rows on hover. */
  @property({ type: Boolean, reflect: true }) hoverable = false;

  /** Reduces cell padding. */
  @property({ type: Boolean, reflect: true }) narrow = false;

  /** Forces the table to span the full container width. */
  @property({ type: Boolean, reflect: true }) fullwidth = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-table': PaiTable;
  }
}
