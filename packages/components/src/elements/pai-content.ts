import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary Applies readable typographic spacing to arbitrary rich-text/HTML content
 * (headings, paragraphs, lists, tables, blockquotes), like Bulma's `.content`.
 * @slot - Rich text content.
 */
@customElement('pai-content')
export class PaiContent extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        color: var(--pai-color-text);
        line-height: var(--pai-line-height);
      }
      ::slotted(h1),
      ::slotted(h2),
      ::slotted(h3),
      ::slotted(h4) {
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
        margin-top: var(--pai-space-4);
        margin-bottom: var(--pai-space-3);
      }
      ::slotted(p),
      ::slotted(ul),
      ::slotted(ol),
      ::slotted(blockquote),
      ::slotted(table) {
        margin-bottom: var(--pai-space-4);
      }
      ::slotted(ul),
      ::slotted(ol) {
        padding-left: var(--pai-space-5);
      }
      ::slotted(blockquote) {
        border-left: 3px solid var(--pai-color-border);
        padding-left: var(--pai-space-4);
        color: var(--pai-color-grey);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-content': PaiContent;
  }
}
