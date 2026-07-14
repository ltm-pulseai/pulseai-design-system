import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A vertical navigation menu with optional section labels, like Bulma's `.menu`.
 * Renders a native `<nav>`; slotted `<p>` labels and `<ul>` lists are styled automatically.
 * @slot - `pai-menu-label` text and/or `<ul>` lists of `<li><a>` links.
 */
@customElement('pai-menu')
export class PaiMenu extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        font-size: var(--pai-font-size-6);
      }
      ::slotted(p) {
        margin: var(--pai-space-3) 0 var(--pai-space-1);
        color: var(--pai-color-grey);
        font-size: var(--pai-font-size-7);
        font-weight: var(--pai-font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      ::slotted(ul) {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ::slotted(ul) :is(a) {
        display: block;
        padding: var(--pai-space-2) var(--pai-space-3);
        border-radius: var(--pai-radius-normal);
        color: var(--pai-color-text);
        text-decoration: none;
      }
      ::slotted(ul) :is(a:hover) {
        background-color: var(--pai-color-white-ter);
      }
      ::slotted(ul) :is(a[aria-current]) {
        background-color: var(--pai-color-primary);
        color: var(--pai-color-primary-invert);
      }
    `,
  ];

  render() {
    return html`<nav aria-label="Menu"><slot></slot></nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-menu': PaiMenu;
  }
}
