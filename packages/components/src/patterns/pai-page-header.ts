import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import '../components/pai-breadcrumb.js';
import '../elements/pai-title.js';

export interface PaiPageHeaderCrumb {
  label: string;
  href?: string;
}

/**
 * @summary A page header — an organism composed from `pai-breadcrumb` and `pai-title`,
 * with an actions row, for topping dashboard/detail pages.
 * @slot actions - Buttons/controls aligned to the end of the heading row.
 */
@customElement('pai-page-header')
export class PaiPageHeader extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      pai-breadcrumb {
        margin-bottom: var(--pai-space-2);
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--pai-space-4);
        flex-wrap: wrap;
      }
      .actions {
        display: flex;
        gap: var(--pai-space-2);
      }
    `,
  ];

  /** Breadcrumb trail. Omit for no breadcrumb. */
  @property({ type: Array }) breadcrumbs: PaiPageHeaderCrumb[] = [];

  /** Page heading text. */
  @property() heading = '';

  render() {
    return html`
      ${this.breadcrumbs.length
        ? html`
            <pai-breadcrumb>
              ${this.breadcrumbs.map(
                (crumb) => html`<a href=${crumb.href ?? '#'}>${crumb.label}</a>`,
              )}
            </pai-breadcrumb>
          `
        : nothing}
      <div class="row">
        <pai-title .level=${1} size="3">${this.heading}</pai-title>
        <div class="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-page-header': PaiPageHeader;
  }
}
