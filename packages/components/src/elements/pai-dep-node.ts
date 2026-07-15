import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiDepNodeStatus = 'ok' | 'warn' | 'crit' | 'idle';

/**
 * @summary A node chip used in dependency/architecture diagrams. Status is encoded
 * through border color, background tint, and an optional dot indicator.
 * @slot - Node label.
 * @slot icon - Optional leading icon or emoji.
 */
@customElement('pai-dep-node')
export class PaiDepNode extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--pai-space-xs);
        padding: var(--pai-space-xs) var(--pai-space-sm);
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        font-size: var(--pai-font-size-xs);
        font-weight: var(--pai-font-weight-medium);
        color: var(--pai-color-text);
        cursor: default;
        transition: box-shadow var(--pai-duration-fast) var(--pai-easing);
      }
      :host([status='ok']) {
        border-color: color-mix(in srgb, var(--pai-color-success) 35%, transparent);
        background-color: color-mix(in srgb, var(--pai-color-success) 7%, var(--pai-color-surface));
      }
      :host([status='warn']) {
        border-color: color-mix(in srgb, var(--pai-color-warning) 35%, transparent);
        background-color: color-mix(in srgb, var(--pai-color-warning) 7%, var(--pai-color-surface));
      }
      :host([status='crit']) {
        border-color: color-mix(in srgb, var(--pai-color-danger) 40%, transparent);
        background-color: color-mix(in srgb, var(--pai-color-danger) 8%, var(--pai-color-surface));
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--pai-color-danger) 14%, transparent);
      }
      :host([status='idle']) {
        opacity: 0.6;
      }
      .dot {
        width: 0.45em;
        height: 0.45em;
        border-radius: 50%;
        background-color: var(--pai-color-grey-light);
        flex-shrink: 0;
      }
      :host([status='ok']) .dot { background-color: var(--pai-color-success); }
      :host([status='warn']) .dot { background-color: var(--pai-color-warning); }
      :host([status='crit']) .dot { background-color: var(--pai-color-danger); }
    `,
  ];

  /** Health status — controls color encoding. */
  @property({ reflect: true }) status: PaiDepNodeStatus = 'ok';

  render() {
    return html`
      <span class="dot" aria-hidden="true"></span>
      <slot name="icon"></slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-dep-node': PaiDepNode;
  }
}
