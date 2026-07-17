import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export interface PaiSidebarItem {
  value: string;
  label: string;
  /** Optional emoji or icon character to show before the label. */
  icon?: string;
  /** Optional badge text (e.g. count). */
  badge?: string;
}

export interface PaiSidebarSection {
  /** Section heading shown in muted small caps. Optional. */
  title?: string;
  items: PaiSidebarItem[];
}

/**
 * @summary An application sidebar with a brand slot, collapsible nav sections, and a
 * footer slot. Emits `pai-nav-change` when the active item changes.
 * @slot brand - Logo / product name area at the top.
 * @slot nav - Arbitrary extra nav content injected after the `sections` items.
 * @slot footer - Pinned footer area (user avatar, settings link, etc.).
 * @fires pai-nav-change - Fires when the active nav item changes; `event.detail.value`.
 */
@customElement('pai-sidebar')
export class PaiSidebar extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: var(--pai-sidebar-width, 220px);
        height: 100%;
        background-color: var(--pai-color-surface);
        border-right: 1px solid var(--pai-color-border);
        overflow-y: auto;
        overflow-x: hidden;
        flex-shrink: 0;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: var(--pai-space-sm);
        padding: var(--pai-space-sm) var(--pai-space-sm);
        min-height: 3.25rem;
        border-bottom: 1px solid var(--pai-color-border);
        flex-shrink: 0;
      }
      nav {
        flex: 1;
        padding: var(--pai-space-xs) 0;
        overflow-y: auto;
      }
      .section-title {
        padding: var(--pai-space-xs) var(--pai-space-sm);
        font-size: 0.62rem;
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: var(--pai-color-grey);
        font-weight: var(--pai-font-weight-semibold);
        user-select: none;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: var(--pai-space-xs);
        padding: var(--pai-space-xs) var(--pai-space-sm);
        margin: 1px var(--pai-space-xs);
        border-radius: var(--pai-radius-normal);
        cursor: pointer;
        color: var(--pai-color-text);
        font-size: var(--pai-font-size-sm);
        border: none;
        background: none;
        width: calc(100% - (var(--pai-space-xs) * 2));
        text-align: left;
        font-family: inherit;
        transition: background-color var(--pai-duration-fast) var(--pai-easing),
          color var(--pai-duration-fast) var(--pai-easing);
      }
      .nav-item:hover {
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
      }
      .nav-item.active {
        background-color: color-mix(in srgb, var(--pai-color-primary) 12%, transparent);
        color: var(--pai-color-primary);
        font-weight: var(--pai-font-weight-semibold);
      }
      .nav-item:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: -2px;
      }
      .item-icon {
        font-size: 1em;
        flex-shrink: 0;
        width: 1.25em;
        text-align: center;
      }
      .item-label {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .badge {
        font-size: 0.65rem;
        padding: 0.1em 0.45em;
        border-radius: var(--pai-radius-rounded);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-grey);
        font-weight: var(--pai-font-weight-semibold);
        flex-shrink: 0;
      }
      .footer {
        padding: var(--pai-space-sm);
        border-top: 1px solid var(--pai-color-border);
        flex-shrink: 0;
      }
    `,
  ];

  /** Navigation sections with optional group headings. */
  @property({ type: Array }) sections: PaiSidebarSection[] = [];

  /** The `value` of the currently active nav item. */
  @property() active = '';

  private _select(value: string) {
    if (value === this.active) return;
    this.active = value;
    this.dispatchEvent(
      new CustomEvent('pai-nav-change', { detail: { value }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <div class="brand"><slot name="brand"></slot></div>
      <nav aria-label="Sidebar navigation">
        ${this.sections.map(
          (section) => html`
            ${section.title
              ? html`<div class="section-title" aria-hidden="true">${section.title}</div>`
              : ''}
            ${section.items.map(
              (item) => html`
                <button
                  class="nav-item ${item.value === this.active ? 'active' : ''}"
                  aria-current=${item.value === this.active ? 'page' : 'false'}
                  @click=${() => this._select(item.value)}
                >
                  ${item.icon
                    ? html`<span class="item-icon" aria-hidden="true">${item.icon}</span>`
                    : ''}
                  <span class="item-label">${item.label}</span>
                  ${item.badge ? html`<span class="badge">${item.badge}</span>` : ''}
                </button>
              `,
            )}
          `,
        )}
        <slot name="nav"></slot>
      </nav>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-sidebar': PaiSidebar;
  }
}
