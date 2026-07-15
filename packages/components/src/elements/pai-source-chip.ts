import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A numbered superscript citation chip for referencing sources inline —
 * documents, data entries, footnotes, or any numbered reference.
 * @fires pai-cite - Fired when the chip is clicked, with `event.detail.n`.
 * @slot - Overrides the default number display.
 */
@customElement('pai-source-chip')
export class PaiSourceChip extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.35em;
        height: 1.35em;
        padding: 0 0.25em;
        border-radius: var(--pai-radius-rounded);
        background-color: color-mix(in srgb, var(--pai-color-primary) 14%, transparent);
        color: var(--pai-color-primary);
        font-size: 0.68em;
        font-weight: var(--pai-font-weight-bold);
        cursor: pointer;
        vertical-align: super;
        line-height: 1;
        border: none;
        transition: background-color var(--pai-duration-fast) var(--pai-easing);
        font-family: var(--pai-family-sans, sans-serif);
      }
      :host(:hover) {
        background-color: color-mix(in srgb, var(--pai-color-primary) 24%, transparent);
      }
      :host(:focus-visible) {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
      }
    `,
  ];

  /** Citation number to display. */
  @property({ type: Number }) n = 1;

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent('pai-cite', { detail: { n: this.n }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <button
        role="button"
        aria-label="Source ${this.n}"
        tabindex="0"
        style="all:inherit;cursor:inherit;"
        @click=${this._onClick}
      >
        <slot>${this.n}</slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-source-chip': PaiSourceChip;
  }
}
