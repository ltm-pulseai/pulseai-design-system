import { html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import '../form/pai-input.js';
import '../elements/pai-button.js';
import type { PaiInput } from '../form/pai-input.js';

/**
 * @summary A search field with an attached submit button — a molecule composed from
 * `pai-input` and `pai-button`, demonstrating how primitives combine into higher-level patterns.
 * @fires pai-search - Fired on submit (Enter or button click), with `event.detail.value`.
 */
@customElement('pai-search-bar')
export class PaiSearchBar extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      form {
        display: flex;
        gap: var(--pai-space-2);
      }
      pai-input {
        flex: 1;
      }
      pai-button {
        flex: 0 0 auto;
      }
    `,
  ];

  /** Placeholder text for the search field. */
  @property() placeholder = 'Search…';

  /** Current search value. */
  @property() value = '';

  /** Label for the submit button. */
  @property({ attribute: 'button-label' }) buttonLabel = 'Search';

  /** Accessible label for the input (no visible `<label>` is rendered). */
  @property() label = 'Search';

  @query('pai-input') private _input!: PaiInput;

  private _onInput(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value;
  }

  private _onSubmit(event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('pai-search', { detail: { value: this.value }, bubbles: true, composed: true }),
    );
  }

  /** Focuses the internal search input. */
  focus() {
    this._input?.focus();
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <pai-input
          type="search"
          .value=${this.value}
          placeholder=${this.placeholder}
          aria-label=${this.label}
          @pai-input=${this._onInput}
        ></pai-input>
        <pai-button type="submit" color="primary">${this.buttonLabel}</pai-button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-search-bar': PaiSearchBar;
  }
}
