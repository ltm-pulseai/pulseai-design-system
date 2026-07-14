import { html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import { FormAssociatedMixin } from '../base/form-associated-mixin.js';

/**
 * @summary A styled file picker, like Bulma's `.file`. Wraps a visually-hidden native
 * `<input type="file">` in a `<label>` so the whole control is natively clickable/focusable,
 * and shows the selected file name.
 * @fires pai-change - Fired when the selection changes, with `event.detail.files`.
 */
@customElement('pai-file')
export class PaiFile extends FormAssociatedMixin(PaiElement) {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
        font-family: var(--pai-font-family);
      }
      label {
        display: inline-flex;
        align-items: center;
        gap: var(--pai-space-2);
        padding: calc(0.5em - 1px) 1em;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-text-strong);
        cursor: pointer;
      }
      label:has(input:focus-visible) {
        outline: 2px solid var(--pai-color-link);
        outline-offset: 1px;
      }
      input {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
      .filename {
        color: var(--pai-color-grey);
        font-size: var(--pai-font-size-7);
      }
    `,
  ];

  @property() name = '';
  @property() accept = '';
  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() label = 'Choose a file…';

  @state() private _fileNames: string[] = [];

  private _onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    this._fileNames = files ? Array.from(files).map((f) => f.name) : [];
    if (files && files[0]) {
      const data = new FormData();
      data.append(this.name || 'file', files[0]);
      this.internals.setFormValue(data);
    } else {
      this.internals.setFormValue(null);
    }
    this.dispatchEvent(
      new CustomEvent('pai-change', { detail: { files }, bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <label>
        <input
          type="file"
          name=${this.name || nothing}
          accept=${this.accept || nothing}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        <span>${this.label}</span>
        ${this._fileNames.length
          ? html`<span class="filename">${this._fileNames.join(', ')}</span>`
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-file': PaiFile;
  }
}
