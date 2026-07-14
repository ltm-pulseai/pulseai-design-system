import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import type { PaiButtonColor } from './pai-button.js';
import './pai-delete.js';

export type PaiTagSize = 'normal' | 'medium' | 'large';
export type PaiTagVariant = 'filled' | 'outlined' | 'soft';

/**
 * @summary A small label/chip. Visual treatment (`variant`) and semantic intent
 * (`color`) are independent props, so they compose freely (e.g. `variant="soft" color="success"`).
 * @slot - Tag label.
 * @fires pai-dismiss - Fired when the optional built-in delete button is activated.
 */
@customElement('pai-tag')
export class PaiTag extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--pai-space-3xs);
        height: 2em;
        padding: 0 0.75em;
        border: 1px solid transparent;
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        font-size: var(--pai-font-size-xs);
        font-weight: var(--pai-font-weight-medium);
        line-height: 1.5;
        white-space: nowrap;
        transition: transform var(--pai-duration-fast) var(--pai-easing);
      }
      :host([rounded]) {
        border-radius: var(--pai-radius-rounded);
      }
      :host([size='medium']) {
        font-size: var(--pai-font-size-sm);
      }
      :host([size='large']) {
        font-size: var(--pai-font-size-md);
      }

      :host([color='primary']) {
        --pai-tag-accent: var(--pai-color-primary);
        --pai-tag-accent-invert: var(--pai-color-primary-invert);
      }
      :host([color='link']) {
        --pai-tag-accent: var(--pai-color-link);
        --pai-tag-accent-invert: var(--pai-color-link-invert);
      }
      :host([color='info']) {
        --pai-tag-accent: var(--pai-color-info);
        --pai-tag-accent-invert: var(--pai-color-info-invert);
      }
      :host([color='success']) {
        --pai-tag-accent: var(--pai-color-success);
        --pai-tag-accent-invert: var(--pai-color-success-invert);
      }
      :host([color='warning']) {
        --pai-tag-accent: var(--pai-color-warning);
        --pai-tag-accent-invert: var(--pai-color-warning-invert);
      }
      :host([color='danger']) {
        --pai-tag-accent: var(--pai-color-danger);
        --pai-tag-accent-invert: var(--pai-color-danger-invert);
      }

      /* Filled (default) — solid accent background. Enumerated (not :not([color='default']))
         so specificity matches the variant selectors below and source order decides. */
      :host([color='primary']),
      :host([color='link']),
      :host([color='info']),
      :host([color='success']),
      :host([color='warning']),
      :host([color='danger']) {
        background-color: var(--pai-tag-accent);
        color: var(--pai-tag-accent-invert);
      }

      /* Outlined — border + text in the accent color, transparent fill. */
      :host([variant='outlined']) {
        background-color: transparent;
        border-color: var(--pai-tag-accent, var(--pai-color-border));
        color: var(--pai-tag-accent, var(--pai-color-text-strong));
      }

      /* Soft — tinted low-opacity fill in the accent color. */
      :host([variant='soft']) {
        background-color: color-mix(in srgb, var(--pai-tag-accent, var(--pai-color-grey-light)) 15%, transparent);
        color: var(--pai-tag-accent, var(--pai-color-text-strong));
      }

      pai-delete {
        --pai-space-1: 2px;
        transform: scale(0.8);
      }
    `,
  ];

  /** Semantic color intent. */
  @property({ reflect: true }) color: PaiButtonColor = 'default';

  /** Visual treatment — independent of `color`. */
  @property({ reflect: true }) variant: PaiTagVariant = 'filled';

  /** Tag size. */
  @property({ reflect: true }) size: PaiTagSize = 'normal';

  /** Fully rounded corners. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  /** Shows a built-in delete button that fires `pai-dismiss`. */
  @property({ type: Boolean, reflect: true }) dismissible = false;

  private _onDismiss(event: Event) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('pai-dismiss', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <slot></slot>
      ${this.dismissible
        ? html`<pai-delete label="Remove" @pai-dismiss=${this._onDismiss}></pai-delete>`
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-tag': PaiTag;
  }
}
