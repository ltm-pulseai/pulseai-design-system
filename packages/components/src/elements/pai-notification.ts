import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from './pai-button.js';
import './pai-delete.js';

/**
 * @summary A colored callout block for messages/alerts, like Bulma's `.notification`.
 * Uses `role="status"` so assistive tech announces it when it appears.
 * @slot - Notification content.
 * @fires pai-dismiss - Fired when the built-in close button is activated. Cancelable —
 * call `event.preventDefault()` to keep the notification visible and handle removal yourself.
 */
@customElement('pai-notification')
export class PaiNotification extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        position: relative;
        border-radius: var(--pai-radius-normal);
        border-left: 4px solid var(--pai-color-grey-light);
        padding: var(--pai-space-4) var(--pai-space-5);
        padding-right: var(--pai-space-6);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text);
      }
      :host([hidden]) {
        display: none;
      }
      pai-delete {
        position: absolute;
        top: var(--pai-space-3);
        right: var(--pai-space-3);
      }

      :host([color='primary']),
      :host([color='link']),
      :host([color='info']),
      :host([color='success']),
      :host([color='warning']),
      :host([color='danger']) {
        border-left-color: transparent;
      }
      :host([color='primary']) {
        background-color: var(--pai-color-primary);
        color: var(--pai-color-primary-invert);
      }
      :host([color='link']) {
        background-color: var(--pai-color-link);
        color: var(--pai-color-link-invert);
      }
      :host([color='info']) {
        background-color: var(--pai-color-info);
        color: var(--pai-color-info-invert);
      }
      :host([color='success']) {
        background-color: var(--pai-color-success);
        color: var(--pai-color-success-invert);
      }
      :host([color='warning']) {
        background-color: var(--pai-color-warning);
        color: var(--pai-color-warning-invert);
      }
      :host([color='danger']) {
        background-color: var(--pai-color-danger);
        color: var(--pai-color-danger-invert);
      }
    `,
  ];

  /** Background/text color variant. */
  @property({ reflect: true }) color: PaiButtonColor | 'default' = 'default';

  /** Shows a built-in close button. */
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
      <div role="status">
        ${this.dismissible ? html`<pai-delete @pai-dismiss=${this._onDismiss}></pai-delete>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-notification': PaiNotification;
  }
}
