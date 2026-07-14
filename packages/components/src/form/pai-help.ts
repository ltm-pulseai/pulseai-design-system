import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiHelpColor = 'default' | 'success' | 'warning' | 'danger';

/**
 * @summary Small helper/validation text below a field, like Bulma's `.help`.
 * @slot - Help text.
 */
@customElement('pai-help')
export class PaiHelp extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        margin-top: var(--pai-space-1);
        font-size: var(--pai-font-size-7);
        color: var(--pai-color-grey);
      }
      :host([color='success']) {
        color: var(--pai-color-success);
      }
      :host([color='warning']) {
        color: var(--pai-color-warning);
      }
      :host([color='danger']) {
        color: var(--pai-color-danger);
      }
    `,
  ];

  /** Text color variant, typically matching the paired control's validation state. */
  @property({ reflect: true }) color: PaiHelpColor = 'default';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-help': PaiHelp;
  }
}
