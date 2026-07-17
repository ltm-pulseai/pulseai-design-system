import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * `sent`     — outgoing message, right-aligned (the current user).
 * `received` — incoming message, left-aligned (the other party).
 * `system`   — neutral system/status notice, centered and muted.
 */
export type PaiChatRole = 'sent' | 'received' | 'system';

/**
 * @summary A single chat message bubble with an avatar. Works for any chat UI —
 * human-to-human, human-to-AI, support, comments, etc.
 * `role="sent"` right-aligns; `role="received"` left-aligns; `role="system"` is muted/centered.
 * @slot        - Message body content.
 * @slot avatar - Override the auto-generated avatar initials with custom content.
 */
@customElement('pai-chat-message')
export class PaiChatMessage extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        gap: var(--pai-space-sm);
        max-width: 100%;
      }
      :host([role='sent']) {
        flex-direction: row-reverse;
      }
      :host([role='system']) {
        justify-content: center;
      }
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        font-weight: var(--pai-font-weight-bold);
        flex-shrink: 0;
        border: 1px solid var(--pai-color-border);
        overflow: hidden;
      }
      :host([role='received']) .avatar {
        background-color: color-mix(in srgb, var(--pai-color-primary) 14%, transparent);
        color: var(--pai-color-primary);
        border-color: color-mix(in srgb, var(--pai-color-primary) 22%, transparent);
      }
      :host([role='sent']) .avatar {
        background-color: color-mix(in srgb, var(--pai-color-info) 14%, transparent);
        color: var(--pai-color-info);
        border-color: color-mix(in srgb, var(--pai-color-info) 22%, transparent);
      }
      :host([role='system']) .avatar {
        display: none;
      }
      .bubble {
        max-width: 78%;
        padding: var(--pai-space-sm) var(--pai-space-md);
        border-radius: var(--pai-radius-large) var(--pai-radius-large) var(--pai-radius-large) 4px;
        background-color: var(--pai-color-white-ter);
        border: 1px solid var(--pai-color-border);
        color: var(--pai-color-text);
        font-size: var(--pai-font-size-sm);
        line-height: 1.55;
      }
      :host([role='sent']) .bubble {
        border-radius: var(--pai-radius-large) var(--pai-radius-large) 4px var(--pai-radius-large);
        background-color: color-mix(in srgb, var(--pai-color-primary) 9%, var(--pai-color-surface));
        border-color: color-mix(in srgb, var(--pai-color-primary) 20%, transparent);
      }
      :host([role='system']) .bubble {
        max-width: 90%;
        background-color: transparent;
        border-style: dashed;
        color: var(--pai-color-grey);
        font-size: var(--pai-font-size-xs);
        font-style: italic;
        text-align: center;
        border-radius: var(--pai-radius-rounded);
      }
    `,
  ];

  /**
   * Message direction and visual treatment.
   * `sent` = right-aligned outgoing; `received` = left-aligned incoming; `system` = centered notice.
   */
  @property({ reflect: true }) role: PaiChatRole = 'received';

  /** Avatar initials or emoji. Falls back to a generic symbol per role. */
  @property() avatar = '';

  render() {
    const fallback = this.role === 'sent' ? 'U' : '◈';
    return html`
      <div class="avatar" aria-hidden="true">
        <slot name="avatar">${this.avatar || fallback}</slot>
      </div>
      <div class="bubble"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-chat-message': PaiChatMessage;
  }
}
