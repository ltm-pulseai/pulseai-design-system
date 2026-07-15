import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiEnvPillEnv = 'prod' | 'staging' | 'dev' | 'local';

/**
 * @summary An environment status pill that shows the current deployment environment
 * with a colored dot indicator. Typically used in top navigation bars.
 * @slot - Environment label text. Defaults to the `env` attribute value.
 */
@customElement('pai-env-pill')
export class PaiEnvPill extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.4em;
        height: 1.75em;
        padding: 0 0.65em;
        border-radius: var(--pai-radius-rounded);
        border: 1px solid var(--pai-color-border);
        background-color: var(--pai-color-surface);
        font-size: var(--pai-font-size-xs);
        font-weight: var(--pai-font-weight-medium);
        color: var(--pai-color-text);
        white-space: nowrap;
        cursor: default;
        user-select: none;
      }
      .dot {
        width: 0.45em;
        height: 0.45em;
        border-radius: 50%;
        background-color: var(--pai-color-grey);
        flex-shrink: 0;
        transition: background-color var(--pai-duration-fast) var(--pai-easing);
      }
      :host([env='prod']) .dot {
        background-color: var(--pai-color-success);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--pai-color-success) 25%, transparent);
      }
      :host([env='staging']) .dot {
        background-color: var(--pai-color-warning);
      }
      :host([env='dev']) .dot {
        background-color: var(--pai-color-info);
      }
    `,
  ];

  /** Deployment environment. Controls the dot indicator color. */
  @property({ reflect: true }) env: PaiEnvPillEnv = 'prod';

  render() {
    return html`
      <span class="dot" aria-hidden="true"></span>
      <slot>${this.env}</slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-env-pill': PaiEnvPill;
  }
}
