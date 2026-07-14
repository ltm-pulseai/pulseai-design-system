import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A boxed panel of related controls/list items with a heading, like Bulma's `.panel`.
 * @slot - `pai-panel`-block-styled content (any elements; they inherit block spacing/border).
 */
@customElement('pai-panel')
export class PaiPanel extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        border-radius: var(--pai-radius-large);
        box-shadow: var(--pai-shadow-normal);
        overflow: hidden;
      }
      .heading {
        padding: var(--pai-space-3) var(--pai-space-4);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
      }
      ::slotted(*) {
        display: block;
        padding: var(--pai-space-3) var(--pai-space-4);
        border-top: 1px solid var(--pai-color-border);
      }
    `,
  ];

  /** Panel heading text. */
  @property() heading = '';

  render() {
    return html`
      <div class="heading" role="heading" aria-level="3">${this.heading}</div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-panel': PaiPanel;
  }
}
