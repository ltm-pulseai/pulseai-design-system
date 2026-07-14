import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from '../elements/pai-button.js';
import '../elements/pai-delete.js';

/**
 * @summary A rich alert banner — a molecule composed from `pai-delete` plus icon/message/action
 * slots, extending `pai-notification`'s pattern with an icon and an actions row.
 * @slot icon - Leading icon.
 * @slot - Message body.
 * @slot actions - Action buttons (e.g. `pai-button`).
 * @fires pai-dismiss - Fired when the close button is activated. Cancelable.
 */
@customElement('pai-alert-banner')
export class PaiAlertBanner extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      .banner {
        display: flex;
        gap: var(--pai-space-3);
        align-items: flex-start;
        border-radius: var(--pai-radius-normal);
        border: 1px solid var(--pai-color-border);
        background-color: var(--pai-color-white-ter);
        padding: var(--pai-space-4);
      }
      .icon {
        flex: 0 0 auto;
        width: 1.5rem;
        height: 1.5rem;
        color: var(--pai-color-grey-dark);
      }
      .body {
        flex: 1;
        min-width: 0;
        color: var(--pai-color-text);
      }
      .actions {
        display: flex;
        gap: var(--pai-space-2);
        margin-top: var(--pai-space-3);
      }
      pai-delete {
        flex: 0 0 auto;
      }

      :host([color='primary']) .banner {
        background-color: color-mix(in srgb, var(--pai-color-primary) 12%, var(--pai-color-white));
        border-color: var(--pai-color-primary);
      }
      :host([color='info']) .banner {
        background-color: color-mix(in srgb, var(--pai-color-info) 12%, var(--pai-color-white));
        border-color: var(--pai-color-info);
      }
      :host([color='success']) .banner {
        background-color: color-mix(in srgb, var(--pai-color-success) 12%, var(--pai-color-white));
        border-color: var(--pai-color-success);
      }
      :host([color='warning']) .banner {
        background-color: color-mix(in srgb, var(--pai-color-warning) 15%, var(--pai-color-white));
        border-color: var(--pai-color-warning);
      }
      :host([color='danger']) .banner {
        background-color: color-mix(in srgb, var(--pai-color-danger) 12%, var(--pai-color-white));
        border-color: var(--pai-color-danger);
      }
    `,
  ];

  /** Accent color variant. */
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
      <div class="banner" role="status">
        <div class="icon"><slot name="icon"></slot></div>
        <div class="body">
          <slot></slot>
          <div class="actions"><slot name="actions"></slot></div>
        </div>
        ${this.dismissible ? html`<pai-delete @pai-dismiss=${this._onDismiss}></pai-delete>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-alert-banner': PaiAlertBanner;
  }
}
