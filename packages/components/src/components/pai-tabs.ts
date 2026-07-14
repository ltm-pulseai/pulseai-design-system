import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export interface PaiTabItem {
  value: string;
  label: string;
}

/**
 * @summary Tabbed navigation following the WAI-ARIA tabs pattern: `tablist`/`tab`/`tabpanel`
 * roles, roving tabindex, and Left/Right/Home/End arrow-key navigation between tabs.
 * Panels are plain light-DOM children tagged with `data-tab="<value>"`; only the child
 * matching the active tab is shown. Tabs and panels don't cross-reference each other via
 * `aria-controls`/`aria-labelledby` IDs (light DOM and shadow DOM have separate ID scopes) —
 * each panel gets a self-contained `aria-label` instead.
 * @slot - One element per tab, each with `data-tab="<value>"` matching an `items` entry.
 * @fires pai-tab-change - Fired when the active tab changes, with `event.detail.value`.
 */
@customElement('pai-tabs')
export class PaiTabs extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      [role='tablist'] {
        display: flex;
        gap: var(--pai-space-4);
        border-bottom: 1px solid var(--pai-color-border);
      }
      [role='tab'] {
        padding: var(--pai-space-2) 0.25rem;
        border: none;
        border-bottom: 2px solid transparent;
        background: transparent;
        color: var(--pai-color-text);
        cursor: pointer;
        font: inherit;
        margin-bottom: -1px;
      }
      [role='tab'][aria-selected='true'] {
        color: var(--pai-color-primary);
        border-bottom-color: var(--pai-color-primary);
        font-weight: var(--pai-font-weight-semibold);
      }
      [role='tab']:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
      }
      .panels {
        padding-top: var(--pai-space-4);
      }
    `,
  ];

  /** Tab headers. */
  @property({ type: Array }) items: PaiTabItem[] = [];

  /** Currently active tab's `value`. Defaults to the first item. */
  @property() active = '';

  willUpdate() {
    if (!this.active && this.items[0]) {
      this.active = this.items[0].value;
    }
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('active') || changed.has('items')) {
      this._syncPanels();
    }
  }

  private _syncPanels() {
    // Panels live in light DOM while the tabs are in this component's shadow root, so
    // aria-controls/aria-labelledby ID references can't cross that boundary (each root
    // has its own ID scope). Panels get a self-contained aria-label instead.
    Array.from(this.children).forEach((child) => {
      const el = child as HTMLElement;
      const tab = el.dataset.tab;
      el.hidden = tab !== this.active;
      if (tab) {
        el.setAttribute('role', 'tabpanel');
        el.setAttribute('aria-label', this.items.find((item) => item.value === tab)?.label ?? tab);
      }
    });
  }

  private _select(value: string) {
    if (value === this.active) return;
    this.active = value;
    this.dispatchEvent(
      new CustomEvent('pai-tab-change', { detail: { value }, bubbles: true, composed: true }),
    );
  }

  private _onKeydown(event: KeyboardEvent) {
    const index = this.items.findIndex((item) => item.value === this.active);
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % this.items.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + this.items.length) % this.items.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = this.items.length - 1;
    else return;

    const next = this.items[nextIndex];
    if (!next) return;
    event.preventDefault();
    this._select(next.value);
    this.updateComplete.then(() => {
      (this.shadowRoot!.querySelector(`[data-value="${next.value}"]`) as HTMLElement)?.focus();
    });
  }

  render() {
    return html`
      <div role="tablist" aria-label="Tabs" @keydown=${this._onKeydown}>
        ${this.items.map(
          (item) => html`
            <button
              role="tab"
              data-value=${item.value}
              id="tab-${item.value}"
              aria-selected=${item.value === this.active}
              tabindex=${item.value === this.active ? '0' : '-1'}
              @click=${() => this._select(item.value)}
            >
              ${item.label}
            </button>
          `,
        )}
      </div>
      <div class="panels"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tabs': PaiTabs;
  }
}
