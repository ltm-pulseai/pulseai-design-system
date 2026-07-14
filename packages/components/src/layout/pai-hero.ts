import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from '../elements/pai-button.js';

export type PaiHeroSize = 'normal' | 'small' | 'medium' | 'large' | 'fullheight';

/**
 * @summary A prominent banner block with head/body/foot regions, like Bulma's `.hero`.
 * @slot head - Optional top region (e.g. a navbar).
 * @slot - Main hero content.
 * @slot foot - Optional bottom region (e.g. tabs).
 */
@customElement('pai-hero')
export class PaiHero extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--pai-color-white-bis);
        color: var(--pai-color-text);
      }
      :host([size='small']) {
        min-height: 24rem;
      }
      :host([size='medium']) {
        min-height: 30rem;
      }
      :host([size='large']) {
        min-height: 36rem;
      }
      :host([size='fullheight']) {
        min-height: 100vh;
      }
      .hero-body {
        flex-grow: 1;
        padding: var(--pai-space-6) var(--pai-space-4);
      }

      :host([color='primary']) {
        background-color: var(--pai-color-primary);
        color: var(--pai-color-primary-invert);
      }
      :host([color='link']) {
        background-color: var(--pai-color-link);
        color: var(--pai-color-link-invert);
      }
      :host([color='info']) {
        background-color: var(--pai-color-info);
        color: var(--pai-color-info-invert);
      }
      :host([color='success']) {
        background-color: var(--pai-color-success);
        color: var(--pai-color-success-invert);
      }
      :host([color='warning']) {
        background-color: var(--pai-color-warning);
        color: var(--pai-color-warning-invert);
      }
      :host([color='danger']) {
        background-color: var(--pai-color-danger);
        color: var(--pai-color-danger-invert);
      }
    `,
  ];

  /** Background/text color variant. */
  @property({ reflect: true }) color: PaiButtonColor | 'default' = 'default';

  /** Controls the hero's minimum height. */
  @property({ reflect: true }) size: PaiHeroSize = 'normal';

  render() {
    return html`
      <div class="hero-head"><slot name="head"></slot></div>
      <div class="hero-body"><slot></slot></div>
      <div class="hero-foot"><slot name="foot"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-hero': PaiHero;
  }
}
