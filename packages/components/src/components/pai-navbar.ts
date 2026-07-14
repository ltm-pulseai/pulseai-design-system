import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A responsive top navigation bar, like Bulma's `.navbar`. Below the `breakpoint`,
 * `start`/`end` content collapses behind a burger button with `aria-expanded`/`aria-controls`.
 * @slot brand - Logo/brand content, always visible.
 * @slot start - Primary nav links, left-aligned on desktop.
 * @slot end - Secondary nav links/actions, right-aligned on desktop.
 */
@customElement('pai-navbar')
export class PaiNavbar extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        border-bottom: 1px solid var(--pai-color-border);
        box-shadow: var(--pai-shadow-small);
      }
      .navbar {
        display: flex;
        align-items: center;
        min-height: 3.25rem;
        padding: 0 var(--pai-space-4);
      }
      .brand {
        display: flex;
        align-items: center;
        flex: 1;
      }
      .burger {
        display: none;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        background: transparent;
        cursor: pointer;
        position: relative;
      }
      .burger span {
        position: absolute;
        left: calc(50% - 8px);
        width: 16px;
        height: 2px;
        background-color: currentColor;
        transition: transform var(--pai-duration-fast) var(--pai-easing);
      }
      .burger span:nth-child(1) {
        top: calc(50% - 6px);
      }
      .burger span:nth-child(2) {
        top: calc(50% - 1px);
      }
      .burger span:nth-child(3) {
        top: calc(50% + 4px);
      }
      :host([open]) .burger span:nth-child(1) {
        transform: translateY(5px) rotate(45deg);
      }
      :host([open]) .burger span:nth-child(2) {
        opacity: 0;
      }
      :host([open]) .burger span:nth-child(3) {
        transform: translateY(-5px) rotate(-45deg);
      }
      .menu {
        display: flex;
        align-items: center;
        gap: var(--pai-space-4);
      }

      @media (max-width: 1023px) {
        .burger {
          display: block;
        }
        .menu {
          display: none;
          flex-direction: column;
          align-items: stretch;
          width: 100%;
          padding: var(--pai-space-3) 0;
        }
        :host([open]) .menu {
          display: flex;
        }
        .navbar {
          flex-wrap: wrap;
        }
      }
    `,
  ];

  /** Whether the collapsed mobile menu is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  private _toggle() {
    this.open = !this.open;
  }

  render() {
    return html`
      <nav class="navbar" aria-label="main navigation">
        <div class="brand">
          <slot name="brand"></slot>
          <button
            class="burger"
            aria-label="menu"
            aria-expanded=${this.open}
            aria-controls="menu"
            @click=${this._toggle}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="menu" id="menu">
          <slot name="start"></slot>
          <slot name="end"></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-navbar': PaiNavbar;
  }
}
