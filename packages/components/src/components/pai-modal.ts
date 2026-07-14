import { html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @summary A modal dialog following the WAI-ARIA dialog pattern: `role="dialog"`
 * `aria-modal="true"`, a focus trap while open, `Escape` to close, and focus
 * restored to the previously-focused element on close.
 * @slot - Dialog title (heading element expected first for `aria-labelledby`).
 * @slot body - Dialog body content.
 * @slot footer - Action buttons.
 * @fires pai-open - Fired when the modal opens.
 * @fires pai-close - Fired when the modal closes (backdrop click, Escape, or `close()`).
 */
@customElement('pai-modal')
export class PaiModal extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: contents;
      }
      .backdrop {
        position: fixed;
        inset: 0;
        z-index: var(--pai-z-overlay, 40);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(10, 10, 10, 0.6);
      }
      .backdrop[hidden] {
        display: none;
      }
      .dialog {
        position: relative;
        z-index: var(--pai-z-modal, 41);
        max-width: 40rem;
        width: calc(100% - 2 * var(--pai-space-4));
        max-height: calc(100vh - 2 * var(--pai-space-5));
        overflow: auto;
        background-color: var(--pai-color-white);
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-large);
        padding: var(--pai-space-5);
      }
      .title {
        font-weight: var(--pai-font-weight-semibold);
        font-size: var(--pai-font-size-4);
        margin-bottom: var(--pai-space-4);
      }
      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--pai-space-2);
        margin-top: var(--pai-space-5);
      }
      .close {
        position: absolute;
        top: var(--pai-space-3);
        right: var(--pai-space-3);
        width: 1.75rem;
        height: 1.75rem;
        border: none;
        border-radius: var(--pai-radius-rounded);
        background: rgba(10, 10, 10, 0.1);
        cursor: pointer;
      }
    `,
  ];

  /** Whether the modal is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Closes the modal on backdrop click. Set false for a required-action dialog. */
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;

  @query('.dialog') private _dialog!: HTMLElement;

  private _lastFocused: HTMLElement | null = null;

  updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    if (this.open) {
      this._lastFocused = document.activeElement as HTMLElement;
      this.updateComplete.then(() => {
        const first = this._focusableElements()[0] ?? this._dialog;
        first?.focus();
      });
      document.addEventListener('keydown', this._onKeydown);
      this.dispatchEvent(new CustomEvent('pai-open', { bubbles: true, composed: true }));
    } else {
      document.removeEventListener('keydown', this._onKeydown);
      this._lastFocused?.focus();
      this.dispatchEvent(new CustomEvent('pai-close', { bubbles: true, composed: true }));
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeydown);
    super.disconnectedCallback();
  }

  /** Opens the modal programmatically. */
  show() {
    this.open = true;
  }

  /** Closes the modal programmatically. */
  close() {
    this.open = false;
  }

  private _focusableElements(): HTMLElement[] {
    const native = Array.from(this.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    // Custom elements (e.g. pai-button) have no native focusability of their own, but
    // PaiElement's delegatesFocus means .focus() on the host reaches their inner
    // focusable element once one exists — querySelectorAll can't see into that
    // separate shadow root, so we include hyphenated tag names as candidates too.
    const custom = Array.from(this.querySelectorAll<HTMLElement>('*')).filter(
      (el) => el.tagName.includes('-') && !el.hasAttribute('disabled'),
    );
    return [...native, ...custom];
  }

  private _onKeydown = (event: KeyboardEvent) => {
    if (!this.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = this._focusableElements();
    if (!focusable.length) {
      event.preventDefault();
      this._dialog.focus();
      return;
    }
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  private _onBackdropClick = (event: MouseEvent) => {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  };

  render() {
    return html`
      <div class="backdrop" ?hidden=${!this.open} @click=${this._onBackdropClick}>
        <div class="dialog" role="dialog" aria-modal="true" aria-label="Dialog" tabindex="-1">
          <button class="close" aria-label="Close" @click=${() => this.close()}>✕</button>
          <div class="title"><slot></slot></div>
          <slot name="body"></slot>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-modal': PaiModal;
  }
}
