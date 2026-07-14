import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A horizontal level splitting content into left/center/right groups, like Bulma's `.level`.
 * @slot left - Items aligned to the start.
 * @slot - Centered items.
 * @slot right - Items aligned to the end.
 */
@customElement('pai-level')
export class PaiLevel extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      .level {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .level-left,
      .level-right {
        display: flex;
        align-items: center;
        gap: var(--pai-space-4);
      }
      :host([mobile]) .level {
        flex-direction: column;
        align-items: stretch;
        gap: var(--pai-space-3);
      }
    `,
  ];

  /** Stacks the level vertically on narrow viewports instead of the default responsive behavior. */
  @property({ type: Boolean, reflect: true }) mobile = false;

  render() {
    return html`
      <div class="level">
        <div class="level-left"><slot name="left"></slot></div>
        <slot></slot>
        <div class="level-right"><slot name="right"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-level': PaiLevel;
  }
}
