import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiSeverityLevel = 'crit' | 'warn' | 'info' | 'ok';

/**
 * @summary A small colored dot that encodes severity or status at a glance.
 * Renders nothing in the light DOM — all visual content is the host element itself.
 */
@customElement('pai-severity-dot')
export class PaiSeverityDot extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        background-color: var(--pai-color-grey-light);
        flex-shrink: 0;
        vertical-align: middle;
      }
      :host([level='crit']) {
        background-color: var(--pai-color-danger);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-danger) 25%, transparent);
      }
      :host([level='warn']) {
        background-color: var(--pai-color-warning);
        box-shadow: 0 0 0 2px color-mix(in srgb, var(--pai-color-warning) 20%, transparent);
      }
      :host([level='info']) {
        background-color: var(--pai-color-info);
      }
      :host([level='ok']) {
        background-color: var(--pai-color-success);
      }
    `,
  ];

  /** Severity level — controls the dot color and optional glow. */
  @property({ reflect: true }) level: PaiSeverityLevel = 'info';

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-severity-dot': PaiSeverityDot;
  }
}
