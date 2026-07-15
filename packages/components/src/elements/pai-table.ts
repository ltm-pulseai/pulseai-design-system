import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Styles a slotted native `<table>`. Keeping the table itself in light DOM
 * preserves native `<table>`/`<th>`/`<caption>` semantics — but that means cell
 * padding/borders/striping/hover can't be reached with `::slotted()` alone: per the
 * CSS Scoping spec, `::slotted()` only matches the top-level slotted node itself
 * (the `<table>`), never its descendants (`<th>`/`<td>`/`<tr>`). Those are applied as
 * inline styles via JS instead, re-synced on `slotchange` and whenever a style prop changes.
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
      :host([fullwidth]) ::slotted(table) {
        width: 100%;
      }
    `,
  ];

  /** Adds full cell borders instead of just row separators. */
  @property({ type: Boolean, reflect: true }) bordered = false;

  /** Alternates row background colors on even rows. */
  @property({ type: Boolean, reflect: true }) striped = false;

  /** Highlights rows on hover. */
  @property({ type: Boolean, reflect: true }) hoverable = false;

  /** Reduces cell padding. */
  @property({ type: Boolean, reflect: true }) narrow = false;

  /** Forces the table to span the full container width. */
  @property({ type: Boolean, reflect: true }) fullwidth = false;

  @query('slot') private _slot!: HTMLSlotElement;

  private _hoveredRow: HTMLElement | null = null;

  updated() {
    // Cheap/idempotent — always resync rather than tracking which prop changed, so
    // slotted content that mutates without a prop change (e.g. row data replaced
    // in place) stays correctly styled too. Also re-run one frame later: on the very
    // first render, the browser can settle the newly-created <slot>'s assignment one
    // tick after this synchronous updated() call, after which no further prop change
    // or slotchange fires to re-trigger a sync — so a first-render-only run can silently
    // miss content that was already there when the element connected.
    this._syncTable();
    requestAnimationFrame(() => this._syncTable());
  }

  private _onSlotChange = () => this._syncTable();

  private _table(): HTMLTableElement | undefined {
    return this._slot?.assignedElements().find((el): el is HTMLTableElement => el.tagName === 'TABLE');
  }

  private _syncTable() {
    const table = this._table();
    if (!table) return;

    const cellPadding = this.narrow ? '0.25em 0.5em' : '0.5em 0.75em';
    const borderWidth = this.bordered ? '1px' : '0 0 1px 0';
    table.querySelectorAll<HTMLElement>('th, td').forEach((cell) => {
      cell.style.padding = cellPadding;
      cell.style.borderColor = 'var(--pai-color-border, #dbdbdb)';
      cell.style.borderStyle = 'solid';
      cell.style.borderWidth = borderWidth;
      cell.style.verticalAlign = 'top';
    });
    table.querySelectorAll<HTMLElement>('th').forEach((th) => {
      th.style.color = 'var(--pai-color-text-strong, #121212)';
      th.style.textAlign = 'left';
    });

    Array.from(table.querySelectorAll<HTMLElement>('tbody tr')).forEach((row, i) => {
      row.style.backgroundColor = this.striped && i % 2 === 1 ? 'var(--pai-color-white-ter, #f5f5f5)' : '';
    });

    table.removeEventListener('mouseover', this._onRowMouseOver);
    table.removeEventListener('mouseout', this._onRowMouseOut);
    if (this.hoverable) {
      table.addEventListener('mouseover', this._onRowMouseOver);
      table.addEventListener('mouseout', this._onRowMouseOut);
    }
  }

  private _onRowMouseOver = (event: MouseEvent) => {
    const row = (event.target as HTMLElement).closest('tbody tr') as HTMLElement | null;
    if (!row || row === this._hoveredRow) return;
    this._hoveredRow = row;
    row.dataset.paiPrevBg = row.style.backgroundColor;
    row.style.backgroundColor =
      'color-mix(in srgb, var(--pai-color-primary, #00d1b2) 6%, var(--pai-color-white-ter, #f5f5f5))';
  };

  private _onRowMouseOut = (event: MouseEvent) => {
    const row = (event.target as HTMLElement).closest('tbody tr') as HTMLElement | null;
    if (!row) return;
    row.style.backgroundColor = row.dataset.paiPrevBg ?? '';
    delete row.dataset.paiPrevBg;
    if (this._hoveredRow === row) this._hoveredRow = null;
  };

  render() {
    return html`<slot @slotchange=${this._onSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-table': PaiTable;
  }
}
