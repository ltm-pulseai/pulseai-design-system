import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A content card with optional image/header/footer regions, like Bulma's `.card`.
 * @slot image - Optional card image (e.g. `pai-image`).
 * @slot header - Optional header/title region.
 * @slot - Main card content.
 * @slot footer - Optional footer actions.
 */
@customElement('pai-card')
export class PaiCard extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-normal);
        overflow: hidden;
      }
      .content {
        padding: var(--pai-space-5);
        color: var(--pai-color-text);
      }
      ::slotted([slot='header']) {
        display: block;
        padding: var(--pai-space-4) var(--pai-space-5);
        border-bottom: 1px solid var(--pai-color-border);
        font-weight: var(--pai-font-weight-semibold);
      }
      .footer {
        display: flex;
        border-top: 1px solid var(--pai-color-border);
      }
      ::slotted([slot='footer']) {
        flex: 1;
        padding: var(--pai-space-3);
        text-align: center;
      }
    `,
  ];

  render() {
    return html`
      <slot name="image"></slot>
      <slot name="header"></slot>
      <div class="content"><slot></slot></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-card': PaiCard;
  }
}
