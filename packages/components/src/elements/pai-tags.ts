import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A wrapping group of `pai-tag` elements, like Bulma's `.tags`.
 * @slot - `pai-tag` elements.
 */
@customElement('pai-tags')
export class PaiTags extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--pai-space-2);
        align-items: center;
      }
      :host([has-addons]) {
        gap: 0;
      }
      :host([has-addons]) ::slotted(pai-tag:not(:first-child)) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      :host([has-addons]) ::slotted(pai-tag:not(:last-child)) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-right: 1px;
      }
    `,
  ];

  /** Joins tags together with no gap, like Bulma's `.has-addons`. */
  @property({ type: Boolean, reflect: true, attribute: 'has-addons' }) hasAddons = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tags': PaiTags;
  }
}
