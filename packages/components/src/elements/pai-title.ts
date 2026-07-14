import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A heading with Bulma-style visual sizing decoupled from semantic level, like `.title`.
 * Renders a native `h1`–`h6` internally based on `level`, so it participates correctly
 * in the document outline regardless of its visual `size`.
 * @slot - Title text.
 */
@customElement('pai-title')
export class PaiTitle extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-semibold);
        line-height: 1.125;
      }
      :host([size='1']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-1);
      }
      :host([size='2']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-2);
      }
      :host([size='3']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-3);
      }
      :host([size='4']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-4);
      }
      :host([size='5']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-5);
      }
      :host([size='6']) :is(h1, h2, h3, h4, h5, h6) {
        font-size: var(--pai-font-size-6);
      }
    `,
  ];

  /** Semantic heading level (1–6) — determines the rendered tag, for correct document outline. */
  @property({ type: Number }) level = 3;

  /** Visual size (1–6, largest to smallest). Defaults to matching `level`. */
  @property({ reflect: true }) size?: string;

  render() {
    const size = this.size ?? String(this.level);
    if (!this.hasAttribute('size')) {
      this.setAttribute('size', size);
    }
    switch (this.level) {
      case 1:
        return html`<h1><slot></slot></h1>`;
      case 2:
        return html`<h2><slot></slot></h2>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 5:
        return html`<h5><slot></slot></h5>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h3><slot></slot></h3>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-title': PaiTitle;
  }
}
