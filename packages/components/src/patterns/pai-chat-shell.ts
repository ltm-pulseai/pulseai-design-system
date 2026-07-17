import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A two-pane chat layout for AI assistant interfaces. The left pane holds the
 * message thread and composer; the right pane holds contextual info (sources, tool calls, etc.).
 * Set `single` to collapse to a single pane.
 * @slot messages  - Chat message stream (`pai-chat-message` elements).
 * @slot composer  - Input / send row at the bottom of the main pane.
 * @slot panel     - Right-hand context panel (hidden when `single`).
 * @slot header    - Optional header bar above the messages area.
 */
@customElement('pai-chat-shell')
export class PaiChatShell extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: grid;
        grid-template-columns: 1fr var(--pai-chat-panel-width, 280px);
        height: var(--pai-chat-height, 600px);
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        overflow: hidden;
      }
      :host([single]) {
        grid-template-columns: 1fr;
      }
      .main {
        display: flex;
        flex-direction: column;
        min-width: 0;
        border-right: 1px solid var(--pai-color-border);
      }
      :host([single]) .main {
        border-right: none;
      }
      .header-slot {
        flex-shrink: 0;
        border-bottom: 1px solid var(--pai-color-border);
      }
      .messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--pai-space-md);
        display: flex;
        flex-direction: column;
        gap: var(--pai-space-md);
      }
      .composer {
        padding: var(--pai-space-sm) var(--pai-space-md);
        border-top: 1px solid var(--pai-color-border);
        background-color: var(--pai-color-surface);
        flex-shrink: 0;
      }
      .side-panel {
        overflow-y: auto;
        padding: var(--pai-space-sm);
        background-color: var(--pai-color-white-ter);
      }
    `,
  ];

  /** Hide the right-hand context panel for a single-pane layout. */
  @property({ type: Boolean, reflect: true }) single = false;

  render() {
    return html`
      <div class="main">
        <div class="header-slot"><slot name="header"></slot></div>
        <div class="messages" role="log" aria-live="polite" aria-label="Chat messages">
          <slot name="messages"></slot>
        </div>
        <div class="composer"><slot name="composer"></slot></div>
      </div>
      ${!this.single
        ? html`<div class="side-panel"><slot name="panel"></slot></div>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-chat-shell': PaiChatShell;
  }
}
