import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A breadcrumb trail, like Bulma's `.breadcrumb`. Wraps slotted `<a>` elements
 * in a `<nav aria-label="breadcrumb">` and marks the last link `aria-current="page"`.
 * Intentionally not a `<ul>`/`<li>` list — `::slotted()` can only style the directly
 * slotted element, not its descendants, so styling `<a>` requires slotting it directly.
 * @slot - `<a>` elements, one per breadcrumb segment.
 */
@customElement('pai-breadcrumb')
export class PaiBreadcrumb extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      .crumbs {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      ::slotted(a) {
        display: inline-block;
        padding: 0 var(--pai-space-2);
        color: var(--pai-color-link);
        text-decoration: none;
        font-size: var(--pai-font-size-6);
      }
      ::slotted(a:first-child) {
        padding-left: 0;
      }
      ::slotted(a:hover) {
        text-decoration: underline;
      }
      ::slotted(a[aria-current='page']) {
        color: var(--pai-color-text-strong);
        font-weight: var(--pai-font-weight-medium);
        cursor: default;
        pointer-events: none;
      }
      ::slotted(a:not(:last-child))::after {
        content: '/';
        margin-left: var(--pai-space-2);
        color: var(--pai-color-grey-light);
      }
    `,
  ];

  private _onSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const links = slot.assignedElements().filter((el): el is HTMLAnchorElement => el.tagName === 'A');
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
        <div class="crumbs">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-breadcrumb': PaiBreadcrumb;
  }
}
