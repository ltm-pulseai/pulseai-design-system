import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Styled label text, like Bulma's `.label`. Purely presentational — it does
 * not establish a programmatic label/control association. For an accessible field,
 * prefer the `label` property on `pai-input`/`pai-textarea`/etc., or use `pai-field`'s
 * `label` slot, which wraps its control and associates natively via slot flattening.
 * @slot - Label text.
 */
@customElement('pai-label')
export class PaiLabel extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
        font-size: var(--pai-font-size-6);
        margin-bottom: var(--pai-space-2);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-label': PaiLabel;
  }
}
