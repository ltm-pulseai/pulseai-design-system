import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A breadcrumb trail, like Bulma's `.breadcrumb`. Wraps slotted `<li><a></a></li>`
 * items in a `<nav aria-label="breadcrumb"><ul>` and marks the last link `aria-current="page"`.
 * @slot - `<li>` elements, each containing one `<a>`, one per breadcrumb segment.
 */
@customElement('pai-breadcrumb')
export class PaiBreadcrumb extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ::slotted(li) {
        display: inline-block;
      }
      ::slotted(li) a {
        display: inline-block;
        padding: 0 var(--pai-space-2);
        color: var(--pai-color-link);
        text-decoration: none;
      }
      ::slotted(li) a:hover {
        text-decoration: underline;
      }
      ::slotted(li) a[aria-current='page'] {
        color: var(--pai-color-text-strong);
        cursor: default;
      }
    `,
  ];

  private _onSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const links = slot
      .assignedElements()
      .flatMap((el) => Array.from(el.querySelectorAll('a')))
      .filter((el): el is HTMLAnchorElement => el.tagName === 'A');
    links.forEach((link, index) => {
      if (index === links.length - 1) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  render() {
    return html`
      <nav aria-label="breadcrumb">
        <ul>
          <slot @slotchange=${this._onSlotChange}></slot>
        </ul>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-breadcrumb': PaiBreadcrumb;
  }
}
