import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @summary A modal dialog built on the native `<dialog>` element (`showModal()`), so it
 * renders in the browser's top layer — immune to clipping/positioning bugs from ancestor
 * `overflow: hidden` or `transform` (e.g. a card, a scroll container, or Storybook's own
 * docs-canvas zoom wrapper, which would otherwise trap a hand-rolled `position: fixed`
 * overlay inside a tiny box). Native `<dialog>` also gives free focus containment,
 * `Escape` handling, and focus restore to the invoking element on close.
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
      dialog {
        position: fixed;
        margin: auto;
        border: none;
        z-index: var(--pai-z-modal, 41);
        max-width: 40rem;
        width: calc(100% - 2 * var(--pai-space-4));
        max-height: calc(100vh - 2 * var(--pai-space-5));
        overflow: auto;
        background-color: var(--pai-color-surface);
        color: var(--pai-color-text);
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-large);
        padding: var(--pai-space-5);
        animation: pai-modal-scale-in var(--pai-duration-normal) var(--pai-easing);
      }
      dialog::backdrop {
        background-color: rgba(10, 10, 10, 0.6);
        backdrop-filter: blur(2px);
        animation: pai-modal-fade-in var(--pai-duration-normal) var(--pai-easing);
      }
      @keyframes pai-modal-fade-in {
        from {
          opacity: 0;
        }
      }
      @keyframes pai-modal-scale-in {
        from {
          opacity: 0;
          transform: scale(0.96) translateY(4px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        dialog,
        dialog::backdrop {
          animation: none;
        }
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

  @query('dialog') private _dialogEl!: HTMLDialogElement;

  updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    if (this.open && !this._dialogEl.open) {
      this._dialogEl.showModal();
      this.updateComplete.then(() => {
        this._focusableElements()[0]?.focus();
      });
      this.dispatchEvent(new CustomEvent('pai-open', { bubbles: true, composed: true }));
    } else if (!this.open && this._dialogEl.open) {
      this._dialogEl.close();
    }
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

  /** Native `<dialog>` close (Escape, `close()`, or form submission) — sync our state. */
  private _onNativeClose = () => {
    this.open = false;
    this.dispatchEvent(new CustomEvent('pai-close', { bubbles: true, composed: true }));
  };

  /** A click that lands on the `<dialog>` element itself (not its content) hit the backdrop area. */
  private _onDialogClick = (event: MouseEvent) => {
    if (this.closeOnBackdrop && event.target === this._dialogEl) {
      this.close();
    }
  };

  render() {
    return html`
      <dialog aria-labelledby="title" @close=${this._onNativeClose} @click=${this._onDialogClick}>
        <button class="close" aria-label="Close" @click=${() => this.close()}>✕</button>
        <div class="title" id="title"><slot></slot></div>
        <slot name="body"></slot>
        <div class="footer"><slot name="footer"></slot></div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-modal': PaiModal;
  }
}
