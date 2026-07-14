import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A media object layout (e.g. avatar + content + action), like Bulma's `.media`.
 * @slot left - Leading media, typically an avatar/icon.
 * @slot - Main content.
 * @slot right - Trailing actions.
 */
@customElement('pai-media')
export class PaiMedia extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        text-align: left;
        gap: var(--pai-space-3);
      }
      .media-content {
        flex: 1 1 auto;
        min-width: 0;
      }
    `,
  ];

  render() {
    return html`
      <slot name="left"></slot>
      <div class="media-content"><slot></slot></div>
      <slot name="right"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-media': PaiMedia;
  }
}
