import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from './pai-button.js';

/**
 * @summary A compact status badge that maps a semantic `color` to a soft-tinted pill.
 * Uses the same `PaiButtonColor` vocabulary as every other PAI component
 * (default/primary/info/success/warning/danger) so it composes freely with the rest of
 * the system without introducing a parallel naming scheme.
 * @slot - Label text.
 */
@customElement('pai-status-pill')
export class PaiStatusPill extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        height: 1.6em;
        padding: 0 0.65em;
        border-radius: var(--pai-radius-rounded);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        font-size: var(--pai-font-size-xs);
        font-weight: var(--pai-font-weight-medium);
        white-space: nowrap;
        line-height: 1;
      }

      /* Map each color to a CSS custom property so variant rules share one definition */
      :host([color='primary']) { --pai-pill-accent: var(--pai-color-primary); }
      :host([color='link'])    { --pai-pill-accent: var(--pai-color-link); }
      :host([color='info'])    { --pai-pill-accent: var(--pai-color-info); }
      :host([color='success']) { --pai-pill-accent: var(--pai-color-success); }
      :host([color='warning']) { --pai-pill-accent: var(--pai-color-warning); }
      :host([color='danger'])  { --pai-pill-accent: var(--pai-color-danger); }

      /* Any color that has an accent gets a soft tint */
      :host([color='primary']),
      :host([color='link']),
      :host([color='info']),
      :host([color='success']),
      :host([color='warning']),
      :host([color='danger']) {
        background-color: color-mix(in srgb, var(--pai-pill-accent) 15%, transparent);
        color: var(--pai-pill-accent);
      }

      .dot {
        width: 0.45em;
        height: 0.45em;
        border-radius: 50%;
        background-color: currentColor;
        flex-shrink: 0;
      }
    `,
  ];

  /** Semantic color — same vocabulary as `pai-button`, `pai-tag`, etc. */
  @property({ reflect: true }) color: PaiButtonColor = 'default';

  /** Show a small colored dot before the label. */
  @property({ type: Boolean, reflect: true }) dot = false;

  render() {
    return html`
      ${this.dot ? html`<span class="dot" aria-hidden="true"></span>` : ''}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-status-pill': PaiStatusPill;
  }
}
