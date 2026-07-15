import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/** Common language identifiers — any other string is accepted and displayed as-is. */
export type PaiCodeBlockLang =
  | 'text' | 'json' | 'yaml' | 'toml' | 'sql'
  | 'bash' | 'sh' | 'typescript' | 'javascript'
  | 'python' | 'go' | 'rust' | 'html' | 'css'
  | (string & {});

/**
 * @summary A monospace code block with an optional header showing the language or filename.
 * Content is rendered in a `<pre>` via the default slot — no runtime syntax highlighting is
 * bundled (add a highlighter externally if needed).
 * @slot - The raw code or log text to display.
 * @slot actions - Optional controls in the block header (e.g. a copy button).
 */
@customElement('pai-code-block')
export class PaiCodeBlock extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-code-bg, var(--pai-color-grey-darker, #0f0f0f));
        border-radius: var(--pai-radius-normal);
        border: 1px solid var(--pai-color-border);
        overflow: hidden;
        font-size: var(--pai-font-size-sm);
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4em 0.85em;
        background-color: color-mix(in srgb, white 5%, transparent);
        border-bottom: 1px solid color-mix(in srgb, white 8%, transparent);
        gap: var(--pai-space-sm);
      }
      .lang {
        font-family: var(--pai-family-mono, 'JetBrains Mono', monospace);
        font-size: 0.72em;
        color: var(--pai-color-grey-light, #aaa);
        text-transform: uppercase;
        letter-spacing: 0.07em;
        font-weight: var(--pai-font-weight-medium);
      }
      .body {
        padding: 0.85em 1em;
        overflow-x: auto;
        font-family: var(--pai-family-mono, 'JetBrains Mono', monospace);
        line-height: 1.65;
        color: var(--pai-code-text, var(--pai-color-grey-lighter, #d4d4d4));
        white-space: pre;
        margin: 0;
      }
    `,
  ];

  /** Language identifier shown in the header. */
  @property({ reflect: true }) lang: PaiCodeBlockLang = 'text';

  /** Optional filename to show instead of the language tag. */
  @property() filename = '';

  /** Hide the header bar entirely. */
  @property({ type: Boolean, attribute: 'no-header' }) noHeader = false;

  render() {
    const label = this.filename || this.lang;
    return html`
      ${!this.noHeader
        ? html`
          <div class="header">
            <span class="lang">${label}</span>
            <slot name="actions"></slot>
          </div>
        `
        : ''}
      <pre class="body"><slot></slot></pre>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-code-block': PaiCodeBlock;
  }
}
