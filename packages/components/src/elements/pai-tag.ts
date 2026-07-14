import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from './pai-button.js';
import './pai-delete.js';

export type PaiTagSize = 'normal' | 'medium' | 'large';

/**
 * @summary A small label/chip, like Bulma's `.tag`.
 * @slot - Tag label.
 * @fires pai-dismiss - Fired when the optional built-in delete button is activated.
 */
@customElement('pai-tag')
export class PaiTag extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--pai-space-1);
        height: 2em;
        padding: 0 0.75em;
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        font-size: var(--pai-font-size-7);
        line-height: 1.5;
        white-space: nowrap;
      }
      :host([rounded]) {
        border-radius: var(--pai-radius-rounded);
      }
      :host([size='medium']) {
        font-size: var(--pai-font-size-6);
      }
      :host([size='large']) {
        font-size: var(--pai-font-size-5);
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

      pai-delete {
        --pai-space-1: 2px;
        transform: scale(0.8);
      }
    `,
  ];

  /** Background/text color variant. */
  @property({ reflect: true }) color: PaiButtonColor | 'default' = 'default';

  /** Tag size. */
  @property({ reflect: true }) size: PaiTagSize = 'normal';

  /** Fully rounded corners. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** Shows a built-in delete button that fires `pai-dismiss`. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  private _onDismiss(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('pai-dismiss', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <slot></slot>
      ${this.dismissible
        ? html`<pai-delete label="Remove" @pai-dismiss=${this._onDismiss}></pai-delete>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tag': PaiTag;
  }
}
