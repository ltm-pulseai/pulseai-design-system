import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A round dismiss/close button, like Bulma's `.delete`. Renders a native
 * `<button>` internally so it's keyboard-focusable and activatable out of the box.
 * @fires pai-dismiss - Fired when the button is activated.
 */
@customElement('pai-delete')
export class PaiDelete extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        padding: 0;
        border: none;
        border-radius: var(--pai-radius-rounded);
        background-color: rgba(10, 10, 10, 0.2);
        cursor: pointer;
      }
      button:hover {
        background-color: rgba(10, 10, 10, 0.3);
      }
      button:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
      }
      svg {
        width: 0.75em;
        height: 0.75em;
      }
    `,
  ];

  /** Accessible label for the button. */
  @property() label = 'Close';

  private _onClick() {
    this.dispatchEvent(new CustomEvent('pai-dismiss', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <button type="button" aria-label=${this.label} @click=${this._onClick}>
        <svg viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-delete': PaiDelete;
  }
}
