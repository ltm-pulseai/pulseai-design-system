import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import './pai-search-bar.js';
import '../elements/pai-table.js';
import '../components/pai-pagination.js';

export interface PaiDataTableColumn {
  key: string;
  label: string;
}

/**
 * @summary A searchable, paginated data table — an organism composed from the
 * `pai-search-bar` molecule plus `pai-table` and `pai-pagination` primitives.
 * Filtering/pagination run client-side over the `rows` property.
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

  @state() private _filter = '';
  @state() private _page = 1;

  private get _filteredRows() {
    if (!this._filter) return this.rows;
    const needle = this._filter.toLowerCase();
    return this.rows.filter((row) =>
      this.columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(needle)),
    );
  }

  private get _totalPages() {
    return Math.max(1, Math.ceil(this._filteredRows.length / this.pageSize));
  }

  private get _pageRows() {
    const start = (this._page - 1) * this.pageSize;
    return this._filteredRows.slice(start, start + this.pageSize);
  }

  private _onSearch(event: CustomEvent<{ value: string }>) {
    this._filter = event.detail.value;
    this._page = 1;
  }

  private _onPageChange(event: CustomEvent<{ page: number }>) {
    this._page = event.detail.page;
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
                    ${this.columns.map((col) => html`<th>${col.label}</th>`)}
                  </tr>
                </thead>
                <tbody>
                  ${this._pageRows.map(
                    (row) => html`<tr>${this.columns.map((col) => html`<td>${row[col.key]}</td>`)}</tr>`,
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
