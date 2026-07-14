import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A trigger + popup menu, like Bulma's `.dropdown`, following the WAI-ARIA
 * menu-button pattern: trigger has `aria-haspopup`/`aria-expanded`, `Escape`/outside-click
 * closes, and Arrow Up/Down move focus among slotted menu items.
 * @slot trigger - The trigger control (e.g. a `pai-button`).
 * @slot - Menu items (elements with `role="menuitem"`, e.g. `<a role="menuitem">`).
 */
@customElement('pai-dropdown')
export class PaiDropdown extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        position: relative;
        display: inline-block;
      }
      .trigger {
        display: inline-block;
      }
      .menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: var(--pai-z-dropdown, 20);
        margin-top: var(--pai-space-1);
        min-width: 12rem;
        background-color: var(--pai-color-white);
        border-radius: var(--pai-radius-normal);
        box-shadow: var(--pai-shadow-normal);
        padding: var(--pai-space-2) 0;
      }
      .menu[hidden] {
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

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocumentClick);
    super.disconnectedCallback();
  }

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
      <div class="menu" role="menu" ?hidden=${!this.open} @keydown=${this._onMenuKeydown}>
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
