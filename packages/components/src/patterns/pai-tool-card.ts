import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A generic integration/tool registration card showing a name, optional subtitle
 * (e.g. provider, server, version, category), description, and action/tag slots.
 * Suitable for plugin marketplaces, integration catalogs, API directories, or tool lists.
 * @slot icon   - Leading icon (emoji or SVG).
 * @slot action - Trailing action (e.g. enable/disable toggle, link button).
 * @slot        - Extra body content (parameter chips, status tags, links).
 */
@customElement('pai-tool-card')
export class PaiToolCard extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        padding: var(--pai-space-md);
        box-shadow: var(--pai-shadow-normal);
        transition: box-shadow var(--pai-duration-normal) var(--pai-easing),
          transform var(--pai-duration-normal) var(--pai-easing);
      }
      :host(:hover) {
        box-shadow: var(--pai-shadow-large);
        transform: translateY(-1px);
      }
      .header {
        display: flex;
        align-items: flex-start;
        gap: var(--pai-space-sm);
        margin-bottom: var(--pai-space-sm);
      }
      .icon {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--pai-radius-normal);
        background-color: color-mix(in srgb, var(--pai-color-primary) 12%, var(--pai-color-surface));
        color: var(--pai-color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        flex-shrink: 0;
      }
      .info {
        flex: 1;
        min-width: 0;
      }
      .name {
        font-weight: var(--pai-font-weight-semibold);
        color: var(--pai-color-text-strong);
        font-size: var(--pai-font-size-sm);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
      }
      .subtitle {
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-grey);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0.1em;
      }
      .description {
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-text);
        line-height: 1.55;
        margin-bottom: var(--pai-space-xs);
      }
      .footer {
        display: flex;
        align-items: center;
        gap: var(--pai-space-xs);
        flex-wrap: wrap;
      }
    `,
  ];

  /** Card title / tool name. */
  @property() name = '';

  /** Secondary label below the name — provider, version, category, server URL, etc. */
  @property() subtitle = '';

  /** Short description of what this tool/integration does. */
  @property() description = '';

  render() {
    return html`
      <div class="header">
        <div class="icon"><slot name="icon">⚙</slot></div>
        <div class="info">
          <div class="name">${this.name}</div>
          ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
        </div>
        <slot name="action"></slot>
      </div>
      ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
      <div class="footer"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tool-card': PaiToolCard;
  }
}
