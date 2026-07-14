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
  | 'danger'
  | 'text';

export type PaiButtonSize = 'small' | 'normal' | 'medium' | 'large';

/**
 * @summary A clickable button, styled like Bulma's `.button`, implemented as
 * a real Web Component. Renders an `<a>` when `href` is set, otherwise a
 * native `<button>` — so keyboard/AT behavior is native, not re-implemented.
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
        gap: var(--pai-space-2);
        width: 100%;
        padding: calc(0.5em - 1px) 1em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white);
        color: var(--pai-color-text-strong);
        font-family: inherit;
        font-size: var(--pai-font-size-6);
        font-weight: var(--pai-font-weight-normal);
        line-height: var(--pai-line-height);
        text-decoration: none;
        cursor: pointer;
        transition: background-color var(--pai-duration-fast) var(--pai-easing),
          border-color var(--pai-duration-fast) var(--pai-easing),
          box-shadow var(--pai-duration-fast) var(--pai-easing);
      }

      .button:hover {
        border-color: var(--pai-color-grey-light);
      }

      .button:focus-visible {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 2px;
      }

      :host([size='small']) .button {
        font-size: var(--pai-font-size-7);
        padding: calc(0.375em - 1px) 0.75em;
      }
      :host([size='medium']) .button {
        font-size: var(--pai-font-size-5);
      }
      :host([size='large']) .button {
        font-size: var(--pai-font-size-4);
      }

      :host([full-width]) {
        display: block;
      }

      :host([rounded]) .button {
        border-radius: var(--pai-radius-rounded);
      }

      :host([color='primary']) .button {
        background-color: var(--pai-color-primary);
        border-color: transparent;
        color: var(--pai-color-primary-invert);
      }
      :host([color='link']) .button {
        background-color: var(--pai-color-link);
        border-color: transparent;
        color: var(--pai-color-link-invert);
      }
      :host([color='info']) .button {
        background-color: var(--pai-color-info);
        border-color: transparent;
        color: var(--pai-color-info-invert);
      }
      :host([color='success']) .button {
        background-color: var(--pai-color-success);
        border-color: transparent;
        color: var(--pai-color-success-invert);
      }
      :host([color='warning']) .button {
        background-color: var(--pai-color-warning);
        border-color: transparent;
        color: var(--pai-color-warning-invert);
      }
      :host([color='danger']) .button {
        background-color: var(--pai-color-danger);
        border-color: transparent;
        color: var(--pai-color-danger-invert);
      }
      :host([color='text']) .button {
        background-color: transparent;
        border-color: transparent;
        text-decoration: underline;
      }

      :host([outlined][color='primary']) .button {
        background-color: transparent;
        color: var(--pai-color-primary);
        border-color: var(--pai-color-primary);
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

  /** Visual color variant. */
  @property({ reflect: true }) color: PaiButtonColor = 'default';

  /** Button size. */
  @property({ reflect: true }) size: PaiButtonSize = 'normal';

  /** Outlined style instead of filled. */
  @property({ type: Boolean, reflect: true }) outlined = false;

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
