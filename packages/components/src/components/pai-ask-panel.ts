import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A modal command-palette / search overlay.
 * Opens as a centered `<dialog>` with a frosted-glass backdrop. Emits `pai-search`
 * while the user types and `pai-close` when dismissed.
 * @slot - Suggestion chips or result items inside the scroll area.
 * @slot actions - Trailing controls in the search row (e.g. model picker).
 * @fires pai-search - Fires on every input keystroke; `event.detail.value` holds the current query.
 * @fires pai-submit - Fires when the user presses Enter; `event.detail.value` holds the query.
 * @fires pai-close  - Fires when the panel closes (Esc or `open` set to false externally).
 */
@customElement('pai-ask-panel')
export class PaiAskPanel extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: contents;
      }
      dialog {
        position: fixed;
        inset: 0;
        margin: auto;
        translate: 0 -10%;
        padding: 0;
        width: min(620px, 93vw);
        max-height: 65vh;
        display: flex;
        flex-direction: column;
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-large);
        overflow: hidden;
      }
      dialog[open] {
        display: flex;
      }
      dialog::backdrop {
        background-color: rgb(0 0 0 / 45%);
        backdrop-filter: blur(5px);
      }
      .search-row {
        display: flex;
        align-items: center;
        gap: var(--pai-space-sm);
        padding: var(--pai-space-sm) var(--pai-space-md);
        border-bottom: 1px solid var(--pai-color-border);
        flex-shrink: 0;
      }
      .search-icon {
        color: var(--pai-color-grey);
        font-size: 1.1rem;
        flex-shrink: 0;
      }
      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        outline: none;
        font: inherit;
        font-size: var(--pai-font-size-md, 1rem);
        color: var(--pai-color-text-strong);
        caret-color: var(--pai-color-primary);
        min-width: 0;
      }
      .search-input::placeholder {
        color: var(--pai-color-grey-light);
      }
      .results {
        flex: 1;
        overflow-y: auto;
        padding: var(--pai-space-sm);
        display: flex;
        flex-direction: column;
        gap: var(--pai-space-2xs);
      }
      .footer {
        display: flex;
        align-items: center;
        gap: var(--pai-space-sm);
        padding: var(--pai-space-2xs) var(--pai-space-md);
        border-top: 1px solid var(--pai-color-border);
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-grey);
        flex-shrink: 0;
        background-color: var(--pai-color-white-ter);
      }
      kbd {
        display: inline-block;
        padding: 0.1em 0.4em;
        border-radius: var(--pai-radius-small);
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        font-family: var(--pai-family-mono, monospace);
        font-size: 0.82em;
      }
    `,
  ];

  /** Whether the dialog is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Placeholder text for the search input. */
  @property() placeholder = 'Search or ask a question…';

  @query('dialog') private _dialog!: HTMLDialogElement;
  @query('.search-input') private _input!: HTMLInputElement;

  updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (this.open) {
        this._dialog?.showModal();
        requestAnimationFrame(() => this._input?.focus());
      } else {
        this._dialog?.close();
      }
    }
  }

  private _onDialogClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('pai-close', { bubbles: true, composed: true }));
  }

  private _onInput(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('pai-search', { detail: { value }, bubbles: true, composed: true }),
    );
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      this.dispatchEvent(
        new CustomEvent('pai-submit', { detail: { value }, bubbles: true, composed: true }),
      );
    }
  }

  render() {
    return html`
      <dialog @close=${this._onDialogClose}>
        <div class="search-row">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input
            class="search-input"
            type="text"
            placeholder=${this.placeholder}
            autocomplete="off"
            spellcheck="false"
            @input=${this._onInput}
            @keydown=${this._onKeydown}
          />
          <slot name="actions"></slot>
        </div>
        <div class="results" role="listbox" aria-label="Suggestions"><slot></slot></div>
        <div class="footer">
          <kbd>↵</kbd>&nbsp;send
          <kbd>Esc</kbd>&nbsp;close
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-ask-panel': PaiAskPanel;
  }
}
