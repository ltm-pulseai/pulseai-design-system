import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A trigger + popup menu, like Bulma's `.dropdown`, following the WAI-ARIA
 * menu-button pattern: trigger has `aria-haspopup`/`aria-expanded`, `Escape`/outside-click
 * closes, and Arrow Up/Down move focus among slotted menu items.
 *
 * The menu uses the Popover API (`popover="manual"`) so it renders in the browser's top
 * layer — immune to clipping from an ancestor's `overflow: hidden` or `transform` (e.g. a
 * card, a scroll container, or Storybook's own docs-canvas zoom wrapper). Position is
 * computed from the trigger's bounding rect on open.
 * @slot trigger - The trigger control (e.g. a `pai-button`).
 * @slot - Menu items (elements with `role="menuitem"`, e.g. `<a role="menuitem">`).
 */
@customElement('pai-dropdown')
export class PaiDropdown extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
      }
      .trigger {
        display: inline-block;
      }
      .menu {
        position: fixed;
        margin: 0;
        border: none;
        padding: var(--pai-space-2) 0;
        min-width: 12rem;
        max-width: 20rem;
        max-height: 60vh;
        overflow: auto;
        background-color: var(--pai-color-surface);
        color: var(--pai-color-text);
        border-radius: var(--pai-radius-normal);
        box-shadow: var(--pai-shadow-normal);
        z-index: var(--pai-z-dropdown, 20);
      }
      .menu:not(:popover-open) {
        display: none;
      }
      ::slotted([role='menuitem']) {
        display: block;
        padding: var(--pai-space-2) var(--pai-space-4);
        color: var(--pai-color-text);
        text-decoration: none;
        cursor: pointer;
      }
      ::slotted([role='menuitem']:hover),
      ::slotted([role='menuitem']:focus) {
        background-color: var(--pai-color-white-ter);
        outline: none;
      }
    `,
  ];

  /** Whether the menu is currently open. */
  @property({ type: Boolean, reflect: true }) open = false;

  @query('.trigger-slot') private _triggerSlot!: HTMLSlotElement;
  @query('.menu-slot') private _menuSlot!: HTMLSlotElement;
  @query('.menu') private _menuEl!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
    window.addEventListener('resize', this._onViewportChange);
    window.addEventListener('scroll', this._onViewportChange, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocumentClick);
    window.removeEventListener('resize', this._onViewportChange);
    window.removeEventListener('scroll', this._onViewportChange, true);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    if (this.open) {
      this._positionMenu();
      this._menuEl.showPopover();
    } else if (this._menuEl.matches(':popover-open')) {
      this._menuEl.hidePopover();
    }
  }

  private _positionMenu() {
    const triggerEl = this._triggerSlot?.assignedElements()[0] as HTMLElement | undefined;
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    this._menuEl.style.top = `${rect.bottom + 4}px`;
    this._menuEl.style.left = `${rect.left}px`;
  }

  private _onViewportChange = () => {
    if (this.open) this._positionMenu();
  };

  private _onDocumentClick = (event: MouseEvent) => {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  };

  private _toggle() {
    this.open = !this.open;
    if (this.open) {
      this.updateComplete.then(() => this._focusFirstItem());
    }
  }

  private _menuItems(): HTMLElement[] {
    return (this._menuSlot?.assignedElements() ?? []).filter(
      (el): el is HTMLElement => el.getAttribute('role') === 'menuitem',
    );
  }

  private _focusFirstItem() {
    this._menuItems()[0]?.focus();
  }

  private _onTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open = true;
      this.updateComplete.then(() => this._focusFirstItem());
    }
  }

  private _onMenuKeydown(event: KeyboardEvent) {
    const items = this._menuItems();
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      (this._triggerSlot?.assignedElements()[0] as HTMLElement)?.focus();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    }
  }

  render() {
    return html`
      <span class="trigger" @click=${this._toggle} @keydown=${this._onTriggerKeydown}>
        <slot name="trigger" class="trigger-slot" aria-haspopup="true" aria-expanded=${this.open}></slot>
      </span>
      <div class="menu" popover="manual" role="menu" @keydown=${this._onMenuKeydown}>
        <slot class="menu-slot"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-dropdown': PaiDropdown;
  }
}
