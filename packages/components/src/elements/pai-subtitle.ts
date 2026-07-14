import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A secondary heading paired with `pai-title`, like Bulma's `.subtitle`.
 * @slot - Subtitle text.
 */
@customElement('pai-subtitle')
export class PaiSubtitle extends PaiElement {
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
        color: var(--pai-color-grey-dark);
        font-weight: var(--pai-font-weight-normal);
        line-height: 1.25;
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

  /** Semantic heading level (1–6) — determines the rendered tag. */
  @property({ type: Number }) level = 5;

  /** Visual size (1–6). Defaults to matching `level`. */
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
      case 3:
        return html`<h3><slot></slot></h3>`;
      case 4:
        return html`<h4><slot></slot></h4>`;
      case 6:
        return html`<h6><slot></slot></h6>`;
      default:
        return html`<h5><slot></slot></h5>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-subtitle': PaiSubtitle;
  }
}
