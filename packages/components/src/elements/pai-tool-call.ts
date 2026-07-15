import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary An inline MCP tool-call block rendered inside agent chat messages.
 * Shows the tool name and a toggle to expand the raw input/output body.
 * @slot - The tool's input/output content (shown when `open`).
 * @slot status - Optional status indicator (e.g. a `pai-status-pill`).
 */
@customElement('pai-tool-call')
export class PaiToolCall extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        overflow: hidden;
        font-size: var(--pai-font-size-xs);
        margin: var(--pai-space-xs) 0;
      }
      .head {
        display: flex;
        align-items: center;
        gap: var(--pai-space-xs);
        padding: 0.4em 0.7em;
        background-color: color-mix(in srgb, var(--pai-color-primary) 7%, var(--pai-color-surface));
        cursor: pointer;
        user-select: none;
      }
      .head:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: -2px;
      }
      .icon {
        color: var(--pai-color-grey);
        font-size: 0.9em;
        flex-shrink: 0;
      }
      .name {
        font-family: var(--pai-family-mono, monospace);
        font-weight: var(--pai-font-weight-semibold);
        color: var(--pai-color-primary);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chevron {
        color: var(--pai-color-grey);
        font-size: 0.65em;
        flex-shrink: 0;
        transition: transform var(--pai-duration-fast) var(--pai-easing);
      }
      :host([open]) .chevron {
        transform: rotate(90deg);
      }
      .body {
        display: none;
        padding: 0.6em 0.85em;
        background-color: var(--pai-color-surface);
        border-top: 1px solid var(--pai-color-border);
        font-family: var(--pai-family-mono, monospace);
        color: var(--pai-color-text);
        white-space: pre-wrap;
        overflow-x: auto;
        line-height: 1.55;
      }
      :host([open]) .body {
        display: block;
      }
    `,
  ];

  /** Tool name to display. */
  @property() tool = '';

  /** Whether the body is expanded. */
  @property({ type: Boolean, reflect: true }) open = false;

  private _toggle() {
    this.open = !this.open;
  }

  private _onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._toggle();
    }
  }

  render() {
    return html`
      <div
        class="head"
        role="button"
        tabindex="0"
        aria-expanded=${this.open}
        @click=${this._toggle}
        @keydown=${this._onKeydown}
      >
        <span class="icon" aria-hidden="true">⚙</span>
        <span class="name">${this.tool}</span>
        <slot name="status"></slot>
        <span class="chevron" aria-hidden="true">▶</span>
      </div>
      <div class="body" aria-hidden=${!this.open}><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tool-call': PaiToolCall;
  }
}
