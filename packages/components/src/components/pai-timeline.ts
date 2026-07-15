import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiTimelineItemStatus = 'ok' | 'warn' | 'crit' | 'info' | 'neutral';

export interface PaiTimelineItem {
  time?: string;
  title: string;
  body?: string;
  status?: PaiTimelineItemStatus;
}

/**
 * @summary A vertical timeline for event/audit-log streams. Each item can carry a
 * semantic status that controls the dot color. Additional items can be projected
 * into the default slot for full compositional control.
 * @slot - Extra timeline items or custom trailing content.
 */
@customElement('pai-timeline')
export class PaiTimeline extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      ol {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
      }
      ol::before {
        content: '';
        position: absolute;
        left: 0.5625rem;
        top: 0.375rem;
        bottom: 0;
        width: 1px;
        background-color: var(--pai-color-border);
      }
      li {
        display: grid;
        grid-template-columns: 1.25rem 1fr;
        column-gap: var(--pai-space-sm);
        padding-bottom: var(--pai-space-md);
        position: relative;
      }
      li:last-child {
        padding-bottom: 0;
      }
      .dot {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        border: 2px solid var(--pai-color-border);
        background-color: var(--pai-color-surface);
        margin-top: 0.2rem;
        flex-shrink: 0;
        z-index: 1;
        position: relative;
        transition: border-color var(--pai-duration-fast) var(--pai-easing);
      }
      li[data-status='ok'] .dot {
        border-color: var(--pai-color-success);
        background-color: var(--pai-color-success);
      }
      li[data-status='warn'] .dot {
        border-color: var(--pai-color-warning);
        background-color: var(--pai-color-warning);
      }
      li[data-status='crit'] .dot {
        border-color: var(--pai-color-danger);
        background-color: var(--pai-color-danger);
      }
      li[data-status='info'] .dot {
        border-color: var(--pai-color-info);
        background-color: var(--pai-color-info);
      }
      .content {
        min-width: 0;
      }
      .time {
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-grey);
        margin-bottom: 0.1em;
        font-family: var(--pai-family-mono, monospace);
      }
      .title {
        font-size: var(--pai-font-size-sm);
        font-weight: var(--pai-font-weight-semibold);
        color: var(--pai-color-text-strong);
        line-height: 1.35;
      }
      .body {
        font-size: var(--pai-font-size-xs);
        color: var(--pai-color-text);
        margin-top: 0.2em;
        line-height: 1.5;
      }
    `,
  ];

  /** Timeline items rendered from data. */
  @property({ type: Array }) items: PaiTimelineItem[] = [];

  render() {
    return html`
      <ol aria-label="Timeline">
        ${this.items.map(
          (item) => html`
            <li data-status=${item.status ?? 'neutral'}>
              <span class="dot" aria-hidden="true"></span>
              <div class="content">
                ${item.time ? html`<div class="time">${item.time}</div>` : nothing}
                <div class="title">${item.title}</div>
                ${item.body ? html`<div class="body">${item.body}</div>` : nothing}
              </div>
            </li>
          `,
        )}
      </ol>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-timeline': PaiTimeline;
  }
}
