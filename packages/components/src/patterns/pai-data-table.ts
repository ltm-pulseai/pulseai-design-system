import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import './pai-search-bar.js';
import '../elements/pai-table.js';
import '../components/pai-pagination.js';
import '../form/pai-checkbox.js';

export type PaiDataTableAlign = 'left' | 'center' | 'right';
export type PaiDataTableSortDirection = 'asc' | 'desc';

export interface PaiDataTableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  label: string;
  /** Enables click-to-sort on this column's header. */
  sortable?: boolean;
  /** Cell/header text alignment. */
  align?: PaiDataTableAlign;
  /** CSS width, e.g. `'8rem'` or `'20%'`. */
  width?: string;
  /** Custom cell content — return a Lit-renderable value (template, string, number, ...). */
  render?: (value: unknown, row: T) => unknown;
}

interface PaiDataTableChangeDetail {
  checked: boolean;
}

/**
 * @summary A searchable, sortable, selectable, paginated data table — an organism
 * composed from `pai-search-bar`, `pai-table`, `pai-checkbox`, and `pai-pagination`.
 * Filtering/sorting/pagination run client-side over the `rows` property. Column
 * definitions support custom cell renderers, width, alignment, and sortability —
 * configurable the way ag-grid's `colDefs` are, scoped to what a design system
 * needs (no virtual scrolling, drag-reorder, or cell editing).
 * @fires pai-selection-change - Fired when row selection changes (only when `selectable`),
 * with `event.detail.selectedRows` — the full row objects, not just keys.
 */
@customElement('pai-data-table')
export class PaiDataTable extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      pai-search-bar {
        margin-bottom: var(--pai-space-4);
      }
      pai-pagination {
        margin-top: var(--pai-space-4);
      }
      .empty {
        padding: var(--pai-space-5);
        text-align: center;
        color: var(--pai-color-grey);
      }
      .select-col {
        width: 2.5rem;
      }
      th[aria-sort] {
        cursor: pointer;
      }
      .sort-button {
        all: unset;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.25em;
        font: inherit;
        font-weight: inherit;
        color: inherit;
      }
      .sort-button:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
        border-radius: var(--pai-radius-small);
      }
      .sort-arrow {
        font-size: 0.75em;
      }
    `,
  ];

  /** Column definitions. */
  @property({ type: Array }) columns: PaiDataTableColumn[] = [];

  /** Row data — plain objects keyed by each column's `key`. */
  @property({ type: Array }) rows: Record<string, unknown>[] = [];

  /** Rows per page. */
  @property({ type: Number, attribute: 'page-size' }) pageSize = 5;

  /** Caption for the table, for screen readers. */
  @property() caption = 'Data table';

  /** Shows a checkbox column and enables row selection. */
  @property({ type: Boolean, reflect: true }) selectable = false;

  /** Row property used as a unique identifier for selection tracking across pages/filters. */
  @property({ attribute: 'row-key' }) rowKey = 'id';

  @state() private _filter = '';
  @state() private _page = 1;
  @state() private _sortKey: string | null = null;
  @state() private _sortDirection: PaiDataTableSortDirection = 'asc';
  @state() private _selected = new Set<unknown>();

  private get _filteredRows() {
    if (!this._filter) return this.rows;
    const needle = this._filter.toLowerCase();
    return this.rows.filter((row) =>
      this.columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(needle)),
    );
  }

  private get _sortedRows() {
    const rows = this._filteredRows;
    if (!this._sortKey) return rows;
    const key = this._sortKey;
    const dir = this._sortDirection === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => this._compare(a[key], b[key]) * dir);
  }

  private get _totalPages() {
    return Math.max(1, Math.ceil(this._filteredRows.length / this.pageSize));
  }

  private get _pageRows() {
    const start = (this._page - 1) * this.pageSize;
    return this._sortedRows.slice(start, start + this.pageSize);
  }

  private get _allFilteredSelected(): boolean {
    const rows = this._filteredRows;
    return rows.length > 0 && rows.every((row) => this._selected.has(this._rowKeyOf(row)));
  }

  private get _someFilteredSelected(): boolean {
    return (
      this._filteredRows.some((row) => this._selected.has(this._rowKeyOf(row))) &&
      !this._allFilteredSelected
    );
  }

  private _rowKeyOf(row: Record<string, unknown>): unknown {
    return row[this.rowKey];
  }

  private _compare(a: unknown, b: unknown): number {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a ?? '').localeCompare(String(b ?? ''));
  }

  private _onSearch(event: CustomEvent<{ value: string }>) {
    this._filter = event.detail.value;
    this._page = 1;
  }

  private _onPageChange(event: CustomEvent<{ page: number }>) {
    this._page = event.detail.page;
  }

  private _onSort(key: string) {
    if (this._sortKey !== key) {
      this._sortKey = key;
      this._sortDirection = 'asc';
    } else if (this._sortDirection === 'asc') {
      this._sortDirection = 'desc';
    } else {
      this._sortKey = null;
    }
  }

  private _toggleRow(row: Record<string, unknown>, checked: boolean) {
    const key = this._rowKeyOf(row);
    const next = new Set(this._selected);
    if (checked) next.add(key);
    else next.delete(key);
    this._selected = next;
    this._emitSelectionChange();
  }

  private _toggleAll(checked: boolean) {
    const next = new Set(this._selected);
    for (const row of this._filteredRows) {
      const key = this._rowKeyOf(row);
      if (checked) next.add(key);
      else next.delete(key);
    }
    this._selected = next;
    this._emitSelectionChange();
  }

  private _emitSelectionChange() {
    const selectedRows = this.rows.filter((row) => this._selected.has(this._rowKeyOf(row)));
    this.dispatchEvent(
      new CustomEvent('pai-selection-change', {
        detail: { selectedRows },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _cellStyle(col: PaiDataTableColumn): string {
    const parts: string[] = [];
    if (col.width) parts.push(`width:${col.width}`);
    if (col.align) parts.push(`text-align:${col.align}`);
    return parts.join(';');
  }

  private _renderHeaderCell(col: PaiDataTableColumn) {
    if (!col.sortable) {
      return html`<th style=${this._cellStyle(col)}>${col.label}</th>`;
    }
    const active = this._sortKey === col.key;
    const ariaSort = active ? (this._sortDirection === 'asc' ? 'ascending' : 'descending') : 'none';
    const arrow = active ? (this._sortDirection === 'asc' ? '▲' : '▼') : '';
    return html`
      <th style=${this._cellStyle(col)} aria-sort=${ariaSort}>
        <button class="sort-button" @click=${() => this._onSort(col.key)}>
          ${col.label}
          ${arrow ? html`<span class="sort-arrow" aria-hidden="true">${arrow}</span>` : nothing}
        </button>
      </th>
    `;
  }

  render() {
    const page = Math.min(this._page, this._totalPages);
    return html`
      <pai-search-bar placeholder="Filter…" button-label="Filter" @pai-search=${this._onSearch}></pai-search-bar>
      ${this._pageRows.length
        ? html`
            <pai-table striped hoverable>
              <table>
                <caption class="is-sr-only">${this.caption}</caption>
                <thead>
                  <tr>
                    ${this.selectable
                      ? html`
                          <th class="select-col">
                            <pai-checkbox
                              .checked=${this._allFilteredSelected}
                              .indeterminate=${this._someFilteredSelected}
                              aria-label="Select all rows"
                              @pai-change=${(e: CustomEvent<PaiDataTableChangeDetail>) =>
                                this._toggleAll(e.detail.checked)}
                            ></pai-checkbox>
                          </th>
                        `
                      : nothing}
                    ${this.columns.map((col) => this._renderHeaderCell(col))}
                  </tr>
                </thead>
                <tbody>
                  ${this._pageRows.map(
                    (row) => html`
                      <tr>
                        ${this.selectable
                          ? html`
                              <td class="select-col">
                                <pai-checkbox
                                  .checked=${this._selected.has(this._rowKeyOf(row))}
                                  aria-label="Select row"
                                  @pai-change=${(e: CustomEvent<PaiDataTableChangeDetail>) =>
                                    this._toggleRow(row, e.detail.checked)}
                                ></pai-checkbox>
                              </td>
                            `
                          : nothing}
                        ${this.columns.map(
                          (col) => html`
                            <td style=${this._cellStyle(col)}>
                              ${col.render ? col.render(row[col.key], row) : row[col.key]}
                            </td>
                          `,
                        )}
                      </tr>
                    `,
                  )}
                </tbody>
              </table>
            </pai-table>
          `
        : html`<p class="empty">No results.</p>`}
      ${this._totalPages > 1
        ? html`<pai-pagination .page=${page} total-pages=${this._totalPages} @pai-page-change=${this._onPageChange}></pai-pagination>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-data-table': PaiDataTable;
  }
}
