import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Groups a label, one or more controls, and help text with consistent spacing,
 * like Bulma's `.field`. The `label` slot is wrapped in a native `<label>` around the
 * default slot, so implicit label/control association works across the slot boundary.
 * @slot label - Label text.
 * @slot - The control(s) (e.g. `pai-input`, or several controls when `grouped`).
 * @slot help - Help/validation text.
 */
@customElement('pai-field')
export class PaiField extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        margin-bottom: var(--pai-space-4);
      }
      label {
        display: block;
      }
      .label-text {
        display: block;
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
        font-size: var(--pai-font-size-6);
        margin-bottom: var(--pai-space-2);
      }
      .label-text:empty {
        display: none;
      }
      .controls {
        display: flex;
        gap: var(--pai-space-2);
      }
      :host([horizontal]) {
        display: flex;
        align-items: flex-start;
        gap: var(--pai-space-4);
      }
      :host([horizontal]) .label-text {
        margin-bottom: 0;
        padding-top: 0.375em;
        flex: 0 0 9rem;
      }
      :host([horizontal]) .controls {
        flex: 1;
      }
      :host([grouped]) .controls {
        flex-wrap: wrap;
      }
    `,
  ];

  /** Places the label to the left of the control(s) instead of above. */
  @property({ type: Boolean, reflect: true }) horizontal = false;

  /** Lays out multiple controls in a row (e.g. an input with an attached button). */
  @property({ type: Boolean, reflect: true }) grouped = false;

  render() {
    return html`
      <label>
        <span class="label-text"><slot name="label"></slot></span>
        <div class="controls"><slot></slot></div>
      </label>
      <slot name="help"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-field': PaiField;
  }
}
