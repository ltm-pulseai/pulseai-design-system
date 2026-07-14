import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from '../elements/pai-button.js';
import '../elements/pai-delete.js';

/**
 * @summary A titled callout block, like Bulma's `.message`. Similar to `pai-notification`
 * but with a distinct header bar. Uses `role="status"` for the body so assistive tech
 * announces new messages.
 * @slot header - Message title.
 * @slot - Message body.
 * @fires pai-dismiss - Fired when the close button is activated. Cancelable.
 */
@customElement('pai-message')
export class PaiMessage extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--pai-space-2);
        padding: var(--pai-space-3) var(--pai-space-4);
        border-radius: var(--pai-radius-normal) var(--pai-radius-normal) 0 0;
        background-color: var(--pai-color-grey-lighter);
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
      }
      .body {
        padding: var(--pai-space-4);
        border: 1px solid var(--pai-color-grey-lighter);
        border-top: none;
        border-radius: 0 0 var(--pai-radius-normal) var(--pai-radius-normal);
        color: var(--pai-color-text);
      }

      :host([color='primary']) .header {
        background-color: var(--pai-color-primary);
        color: var(--pai-color-primary-invert);
      }
      :host([color='primary']) .body {
        border-color: var(--pai-color-primary);
      }
      :host([color='danger']) .header {
        background-color: var(--pai-color-danger);
        color: var(--pai-color-danger-invert);
      }
      :host([color='danger']) .body {
        border-color: var(--pai-color-danger);
      }
      :host([color='success']) .header {
        background-color: var(--pai-color-success);
        color: var(--pai-color-success-invert);
      }
      :host([color='success']) .body {
        border-color: var(--pai-color-success);
      }
      :host([color='warning']) .header {
        background-color: var(--pai-color-warning);
        color: var(--pai-color-warning-invert);
      }
      :host([color='warning']) .body {
        border-color: var(--pai-color-warning);
      }
      :host([color='info']) .header {
        background-color: var(--pai-color-info);
        color: var(--pai-color-info-invert);
      }
      :host([color='info']) .body {
        border-color: var(--pai-color-info);
      }
    `,
  ];

  /** Header/border color variant. */
  @property({ reflect: true }) color: PaiButtonColor | 'default' = 'default';

  /** Shows a built-in close button in the header. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  @state() private _dismissed = false;

  private _onDismiss() {
    const event = new CustomEvent('pai-dismiss', { bubbles: true, composed: true, cancelable: true });
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this._dismissed = true;
    }
  }

  render() {
    if (this._dismissed) {
      this.setAttribute('hidden', '');
      return html``;
    }
    return html`
      <div class="header">
        <slot name="header"></slot>
        ${this.dismissible ? html`<pai-delete @pai-dismiss=${this._onDismiss}></pai-delete>` : nothing}
      </div>
      <div class="body" role="status"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-message': PaiMessage;
  }
}
