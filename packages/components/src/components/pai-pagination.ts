import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Page navigation, like Bulma's `.pagination`. Renders a `<nav aria-label="pagination">`
 * with Previous/Next buttons and a truncated page list; the current page gets `aria-current="page"`.
 * @fires pai-page-change - Fired when a page is selected, with `event.detail.page`.
 */
@customElement('pai-pagination')
export class PaiPagination extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        font-family: var(--pai-font-family);
      }
      ul {
        display: flex;
        align-items: center;
        gap: var(--pai-space-1);
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .prev-next {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--pai-space-3);
      }
      button {
        min-width: 2.25em;
        height: 2.25em;
        padding: 0 0.5em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white);
        color: var(--pai-color-text);
        cursor: pointer;
        font: inherit;
      }
      button:hover:not(:disabled) {
        border-color: var(--pai-color-grey-light);
      }
      button:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 1px;
      }
      button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      button[aria-current='page'] {
        background-color: var(--pai-color-primary);
        border-color: var(--pai-color-primary);
        color: var(--pai-color-primary-invert);
      }
      .ellipsis {
        padding: 0 0.5em;
        color: var(--pai-color-grey);
      }
    `,
  ];

  /** Current 1-based page. */
  @property({ type: Number }) page = 1;

  /** Total number of pages. */
  @property({ type: Number, attribute: 'total-pages' }) totalPages = 1;

  private _go(page: number) {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.dispatchEvent(
      new CustomEvent('pai-page-change', { detail: { page }, bubbles: true, composed: true }),
    );
  }

  private _pageNumbers(): (number | 'ellipsis')[] {
    const { page, totalPages } = this;
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const result: (number | 'ellipsis')[] = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - (sorted[i - 1] as number) > 1) result.push('ellipsis');
      result.push(p);
    });
    return result;
  }

  render() {
    return html`
      <nav aria-label="pagination">
        <div class="prev-next">
          <button ?disabled=${this.page <= 1} @click=${() => this._go(this.page - 1)}>Previous</button>
          <button ?disabled=${this.page >= this.totalPages} @click=${() => this._go(this.page + 1)}>Next</button>
        </div>
        <ul>
          ${this._pageNumbers().map((p) =>
            p === 'ellipsis'
              ? html`<li class="ellipsis" aria-hidden="true">…</li>`
              : html`
                  <li>
                    <button
                      aria-current=${p === this.page ? 'page' : nothing}
                      aria-label="Page ${p}"
                      @click=${() => this._go(p)}
                    >
                      ${p}
                    </button>
                  </li>
                `,
          )}
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-pagination': PaiPagination;
  }
}
