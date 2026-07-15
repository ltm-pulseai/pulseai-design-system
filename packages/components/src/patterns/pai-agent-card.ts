import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from '../elements/pai-button.js';

/**
 * @summary A highlighted agent/service registration card with a colored glow accent.
 * The `color` prop follows the same semantic vocabulary as every other PAI component
 * (primary/success/warning/danger/info/default), so the same card works for any
 * domain — AI agents, microservices, integrations, or team members.
 * @slot icon   - Avatar icon (emoji, SVG, or image).
 * @slot meta   - Bottom tag/status row (pai-tag, pai-status-pill, etc.).
 * @slot        - Additional body content.
 */
@customElement('pai-agent-card')
export class PaiAgentCard extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        padding: var(--pai-space-md);
        position: relative;
        overflow: hidden;
        transition: box-shadow var(--pai-duration-normal) var(--pai-easing),
          transform var(--pai-duration-normal) var(--pai-easing);
      }
      :host(:hover) {
        box-shadow: var(--pai-shadow-large);
        transform: translateY(-2px);
      }

      /* Map color → glow accent using the same CSS-custom-property pattern as pai-button */
      :host([color='primary'])  { --pai-agent-accent: var(--pai-color-primary); }
      :host([color='link'])     { --pai-agent-accent: var(--pai-color-link); }
      :host([color='info'])     { --pai-agent-accent: var(--pai-color-info); }
      :host([color='success'])  { --pai-agent-accent: var(--pai-color-success); }
      :host([color='warning'])  { --pai-agent-accent: var(--pai-color-warning); }
      :host([color='danger'])   { --pai-agent-accent: var(--pai-color-danger); }

      .glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: inherit;
        border: 1px solid color-mix(in srgb, var(--pai-agent-accent, transparent) 35%, var(--pai-color-border));
        box-shadow: inset 0 0 28px 0 color-mix(in srgb, var(--pai-agent-accent, transparent) 12%, transparent);
      }
      .avatar {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 50%;
        background-color: color-mix(in srgb, var(--pai-agent-accent, var(--pai-color-grey-light)) 14%, transparent);
        color: var(--pai-agent-accent, var(--pai-color-text));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        margin-bottom: var(--pai-space-sm);
        flex-shrink: 0;
      }
      .name {
        font-weight: var(--pai-font-weight-semibold);
        color: var(--pai-color-text-strong);
        font-size: var(--pai-font-size-sm);
        line-height: 1.3;
      }
      .description {
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-grey);
        margin-top: var(--pai-space-2xs);
        line-height: 1.5;
      }
      .meta {
        display: flex;
        align-items: center;
        gap: var(--pai-space-xs);
        flex-wrap: wrap;
        margin-top: var(--pai-space-sm);
      }
    `,
  ];

  /** Card/agent name. */
  @property() name = '';

  /** Short description. */
  @property() description = '';

  /**
   * Accent color — follows the same vocabulary as every other PAI component.
   * Controls the glow, avatar tint, and border accent.
   */
  @property({ reflect: true }) color: PaiButtonColor = 'default';

  render() {
    return html`
      <div class="glow" aria-hidden="true"></div>
      <div class="avatar"><slot name="icon">◈</slot></div>
      <div class="name">${this.name}</div>
      <div class="description">${this.description}</div>
      <div class="meta"><slot name="meta"></slot></div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-agent-card': PaiAgentCard;
  }
}
