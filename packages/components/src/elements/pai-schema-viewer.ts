import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export interface PaiSchemaField {
  name: string;
  type: string;
  mapped?: string;
  nullable?: boolean;
  description?: string;
}

/**
 * @summary A tabular schema-field viewer for field-mapping UIs.
 * Displays source field name, type, optional mapped target column, and nullable flag.
 * @slot - Optional content appended below the table (e.g. a "add field" CTA).
 */
@customElement('pai-schema-viewer')
export class PaiSchemaViewer extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        overflow: hidden;
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--pai-font-size-xs);
      }
      thead th {
        text-align: left;
        padding: 0.4em var(--pai-space-sm);
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--pai-color-grey);
        font-weight: var(--pai-font-weight-semibold);
        background-color: var(--pai-color-white-ter);
        border-bottom: 1px solid var(--pai-color-border);
      }
      tbody tr {
        border-bottom: 1px solid color-mix(in srgb, var(--pai-color-border) 55%, transparent);
        transition: background-color var(--pai-duration-fast) var(--pai-easing);
      }
      tbody tr:last-child {
        border-bottom: none;
      }
      tbody tr:hover {
        background-color: var(--pai-color-white-ter);
      }
      td {
        padding: 0.45em var(--pai-space-sm);
        vertical-align: middle;
        color: var(--pai-color-text);
      }
      .field-name {
        font-family: var(--pai-family-mono, monospace);
        font-weight: var(--pai-font-weight-semibold);
        color: var(--pai-color-text-strong);
      }
      .field-type {
        font-family: var(--pai-family-mono, monospace);
        color: var(--pai-color-info);
      }
      .mapped {
        font-family: var(--pai-family-mono, monospace);
        color: var(--pai-color-primary);
      }
      .empty {
        color: var(--pai-color-grey-light);
      }
      .nullable-badge {
        display: inline-block;
        padding: 0.12em 0.4em;
        border-radius: var(--pai-radius-small);
        background-color: color-mix(in srgb, var(--pai-color-warning) 14%, transparent);
        color: var(--pai-color-warning);
        font-size: 0.72em;
        font-weight: var(--pai-font-weight-medium);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .footer {
        padding: var(--pai-space-xs) var(--pai-space-sm);
        border-top: 1px solid var(--pai-color-border);
      }
    `,
  ];

  /** Schema fields to render. */
  @property({ type: Array }) fields: PaiSchemaField[] = [];

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Maps to</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.fields.map(
            (f) => html`
              <tr>
                <td class="field-name">${f.name}</td>
                <td class="field-type">${f.type}</td>
                <td>
                  ${f.mapped
                    ? html`<span class="mapped">${f.mapped}</span>`
                    : html`<span class="empty">—</span>`}
                </td>
                <td>
                  ${f.nullable ? html`<span class="nullable-badge">null</span>` : nothing}
                </td>
              </tr>
            `,
          )}
        </tbody>
      </table>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-schema-viewer': PaiSchemaViewer;
  }
}
