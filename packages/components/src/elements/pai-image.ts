import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A responsive image container with an optional fixed aspect ratio, like Bulma's `.image`.
 */
@customElement('pai-image')
export class PaiImage extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        position: relative;
      }
      :host([ratio]) {
        aspect-ratio: var(--pai-image-ratio, 1 / 1);
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--pai-image-radius, 0);
      }
      :host([rounded]) img {
        border-radius: var(--pai-radius-rounded);
      }
    `,
  ];

  /** Image source URL. */
  @property() src = '';

  /** Alt text — required for meaningful images; pass an empty string for decorative ones. */
  @property() alt = '';

  /** Fixed aspect ratio, e.g. `16/9`, `4/3`, `1/1`. */
  @property({ reflect: true }) ratio?: string;

  /** Renders the image as a circle/rounded shape. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  willUpdate() {
    if (this.ratio) {
      this.style.setProperty('--pai-image-ratio', this.ratio.replace('x', ' / '));
    }
  }

  render() {
    return html`<img src=${this.src} alt=${this.alt ?? nothing} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-image': PaiImage;
  }
}
