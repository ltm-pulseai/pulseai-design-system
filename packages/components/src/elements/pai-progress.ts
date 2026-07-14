import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from './pai-button.js';

/**
 * @summary A progress bar, like Bulma's `.progress`. Wraps a native `<progress>` element,
 * so accessible name/value semantics are native — pass `label` for an accessible name.
 */
@customElement('pai-progress')
export class PaiProgress extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      progress {
        display: block;
        width: 100%;
        height: 1rem;
        border: none;
        border-radius: var(--pai-radius-rounded);
        overflow: hidden;
        color: var(--pai-color-primary);
      }
      progress::-webkit-progress-bar {
        background-color: var(--pai-color-grey-lighter);
      }
      progress::-webkit-progress-value {
        background-color: currentColor;
      }
      progress::-moz-progress-bar {
        background-color: currentColor;
      }

      :host([color='link']) progress {
        color: var(--pai-color-link);
      }
      :host([color='info']) progress {
        color: var(--pai-color-info);
      }
      :host([color='success']) progress {
        color: var(--pai-color-success);
      }
      :host([color='warning']) progress {
        color: var(--pai-color-warning);
      }
      :host([color='danger']) progress {
        color: var(--pai-color-danger);
      }
    `,
  ];

  /** Bar color variant. */
  @property({ reflect: true }) color: PaiButtonColor | 'default' = 'default';

  /** Current value. Omit for an indeterminate/loading bar. */
  @property({ type: Number }) value?: number;

  /** Maximum value. */
  @property({ type: Number }) max = 100;

  /** Accessible name for the progress bar. */
  @property() label = 'Progress';

  render() {
    return html`<progress
      aria-label=${this.label}
      value=${this.value ?? nothing}
      max=${this.max}
    ></progress>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-progress': PaiProgress;
  }
}
