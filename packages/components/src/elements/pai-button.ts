import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiButtonColor =
  | 'default'
  | 'primary'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type PaiButtonVariant = 'filled' | 'outlined' | 'text' | 'soft';

export type PaiButtonSize = 'small' | 'normal' | 'medium' | 'large';

/**
 * @summary A clickable button, implemented as a real Web Component. Renders an `<a>`
 * when `href` is set, otherwise a native `<button>` — so keyboard/AT behavior is native,
 * not re-implemented. Visual treatment (`variant`) and semantic intent (`color`) are
 * independent props, so they compose freely (e.g. `variant="soft" color="danger"`).
 *
 * @slot - Button label content.
 * @slot start - Optional leading icon.
 * @slot end - Optional trailing icon.
 * @csspart button - The internal button/anchor element.
 * @fires pai-click - Re-fired click event when the button is not disabled/loading.
 */
@customElement('pai-button')
export class PaiButton extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
        font-family: var(--pai-font-family);
      }

      .button {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--pai-space-2xs);
        width: 100%;
        padding: calc(0.5em - 1px) 1.1em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-surface);
        color: var(--pai-color-text-strong);
        font-family: inherit;
        font-size: var(--pai-font-size-sm);
        font-weight: var(--pai-font-weight-medium);
        line-height: var(--pai-line-height);
        text-decoration: none;
        cursor: pointer;
        box-shadow: var(--pai-shadow-small);
        transition: background-color var(--pai-duration-fast) var(--pai-easing),
          border-color var(--pai-duration-fast) var(--pai-easing),
          box-shadow var(--pai-duration-fast) var(--pai-easing),
          transform var(--pai-duration-fast) var(--pai-easing);
      }

      .button:hover {
        border-color: var(--pai-color-grey-light);
        transform: translateY(-1px);
        box-shadow: var(--pai-shadow-normal);
      }

      .button:active {
        transform: translateY(0);
        box-shadow: var(--pai-shadow-small);
      }

      .button:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--pai-color-link) 25%, transparent);
      }

      :host([size='small']) .button {
        font-size: var(--pai-font-size-xs);
        padding: calc(0.375em - 1px) 0.75em;
      }
      :host([size='medium']) .button {
        font-size: var(--pai-font-size-md);
      }
      :host([size='large']) .button {
        font-size: var(--pai-font-size-lg);
      }

      :host([full-width]) {
        display: block;
      }

      :host([rounded]) .button {
        border-radius: var(--pai-radius-rounded);
      }

      /* Filled (default) — per-color background, plus a shared --pai-button-accent
         custom property that the outlined/soft/text variants below key off of. */
      :host([color='primary']) .button,
      :host([color='link']) .button,
      :host([color='info']) .button,
      :host([color='success']) .button,
      :host([color='warning']) .button,
      :host([color='danger']) .button {
        border-color: transparent;
        box-shadow: var(--pai-shadow-small), 0 2px 8px -2px var(--pai-button-tint, transparent);
      }
      :host([color='primary']) .button:hover,
      :host([color='link']) .button:hover,
      :host([color='info']) .button:hover,
      :host([color='success']) .button:hover,
      :host([color='warning']) .button:hover,
      :host([color='danger']) .button:hover {
        filter: brightness(1.08);
        box-shadow: var(--pai-shadow-normal), 0 4px 12px -2px var(--pai-button-tint, transparent);
      }
      :host([color='primary']) .button:active,
      :host([color='link']) .button:active,
      :host([color='info']) .button:active,
      :host([color='success']) .button:active,
      :host([color='warning']) .button:active,
      :host([color='danger']) .button:active {
        filter: brightness(0.96);
      }

      :host([color='primary']) .button {
        background: var(--pai-gradient-accent);
        color: var(--pai-color-primary-invert);
        --pai-button-accent: var(--pai-color-primary);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-primary) 45%, transparent);
      }
      :host([color='link']) .button {
        background-color: var(--pai-color-link);
        color: var(--pai-color-link-invert);
        --pai-button-accent: var(--pai-color-link);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-link) 45%, transparent);
      }
      :host([color='info']) .button {
        background-color: var(--pai-color-info);
        color: var(--pai-color-info-invert);
        --pai-button-accent: var(--pai-color-info);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-info) 45%, transparent);
      }
      :host([color='success']) .button {
        background-color: var(--pai-color-success);
        color: var(--pai-color-success-invert);
        --pai-button-accent: var(--pai-color-success);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-success) 45%, transparent);
      }
      :host([color='warning']) .button {
        background-color: var(--pai-color-warning);
        color: var(--pai-color-warning-invert);
        --pai-button-accent: var(--pai-color-warning);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-warning) 45%, transparent);
      }
      :host([color='danger']) .button {
        background-color: var(--pai-color-danger);
        color: var(--pai-color-danger-invert);
        --pai-button-accent: var(--pai-color-danger);
        --pai-button-tint: color-mix(in srgb, var(--pai-color-danger) 45%, transparent);
      }

      /* Outlined — border + text in the accent color, transparent fill. */
      :host([variant='outlined']) .button {
        background: transparent;
        box-shadow: none;
        color: var(--pai-button-accent, var(--pai-color-text-strong));
        border-color: var(--pai-button-accent, var(--pai-color-border));
      }
      :host([variant='outlined']) .button:hover {
        transform: translateY(-1px);
        box-shadow: none;
        background-color: color-mix(in srgb, var(--pai-button-accent, var(--pai-color-grey-light)) 10%, transparent);
      }

      /* Soft — tinted low-opacity fill in the accent color. */
      :host([variant='soft']) .button {
        border-color: transparent;
        box-shadow: none;
        background: color-mix(in srgb, var(--pai-button-accent, var(--pai-color-grey-light)) 15%, transparent);
        color: var(--pai-button-accent, var(--pai-color-text-strong));
      }
      :host([variant='soft']) .button:hover {
        box-shadow: none;
        background: color-mix(in srgb, var(--pai-button-accent, var(--pai-color-grey-light)) 25%, transparent);
      }

      /* Text — no fill or border, underlined label in the accent color. */
      :host([variant='text']) .button {
        background: transparent;
        border-color: transparent;
        box-shadow: none;
        text-decoration: underline;
        color: var(--pai-button-accent, var(--pai-color-text-strong));
      }
      :host([variant='text']) .button:hover {
        transform: none;
        box-shadow: none;
        background-color: var(--pai-color-white-ter);
      }

      :host([disabled]) .button,
      :host([loading]) .button {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: pai-spin var(--pai-duration-slow, 300ms) linear infinite;
      }

      @keyframes pai-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 1.2s;
        }
      }
    `,
  ];

  /** Semantic color intent. */
  @property({ reflect: true }) color: PaiButtonColor = 'default';

  /** Visual treatment — independent of `color`, so they compose (e.g. `variant="soft" color="danger"`). */
  @property({ reflect: true }) variant: PaiButtonVariant = 'filled';

  /** Button size. */
  @property({ reflect: true }) size: PaiButtonSize = 'normal';

  /** Fully rounded corners. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** Stretches to fill container width. */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' }) fullWidth = false;

  /** Disables the button and blocks interaction/AT focus activation. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Shows a busy spinner and marks the button `aria-busy`. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Native button type — ignored when `href` is set. */
  @property() type: 'button' | 'submit' | 'reset' = 'button';

  /** Renders an `<a>` instead of a `<button>` when set. */
  @property() href?: string;

  /** Anchor target — only used when `href` is set. */
  @property() target?: string;

  private _onClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('pai-click', { bubbles: true, composed: true }));
  }

  render() {
    const busy = this.loading ? true : nothing;
    const content = html`
      ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : nothing}
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    `;

    if (this.href && !this.disabled) {
      return html`<a
        class="button"
        part="button"
        href=${this.href}
        target=${this.target ?? nothing}
        rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
        aria-busy=${busy}
        @click=${this._onClick}
        >${content}</a
      >`;
    }

    return html`<button
      class="button"
      part="button"
      type=${this.type}
      ?disabled=${this.disabled || this.loading}
      aria-busy=${busy}
      @click=${this._onClick}
    >
      ${content}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-button': PaiButton;
  }
}
