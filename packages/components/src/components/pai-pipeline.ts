import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export type PaiPipelineStageStatus = 'ok' | 'warn' | 'crit' | 'active' | 'idle';

export interface PaiPipelineStage {
  label: string;
  status: PaiPipelineStageStatus;
  value?: string;
}

/**
 * @summary A horizontal pipeline showing ordered processing stages with chevron connectors.
 * Typically used for ingest/ETL pipeline status visualisation.
 * Each stage's `status` controls its background tint and border accent.
 */
@customElement('pai-pipeline')
export class PaiPipeline extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        gap: 0;
      }
      .stage {
        flex: 1;
        min-width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--pai-space-sm) var(--pai-space-md) var(--pai-space-sm) calc(var(--pai-space-md) + 10px);
        background-color: var(--pai-color-surface);
        border-top: 1px solid var(--pai-color-border);
        border-bottom: 1px solid var(--pai-color-border);
        text-align: center;
        gap: var(--pai-space-2xs);
        position: relative;
        z-index: 0;
        transition: background-color var(--pai-duration-fast) var(--pai-easing);
      }
      /* First stage: left cap, no left indent */
      .stage:first-child {
        padding-left: var(--pai-space-md);
        border-left: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-normal) 0 0 var(--pai-radius-normal);
      }
      /* Last stage: right cap with no chevron */
      .stage:last-child {
        border-right: 1px solid var(--pai-color-border);
        border-radius: 0 var(--pai-radius-normal) var(--pai-radius-normal) 0;
      }
      /* Chevron right edge (pseudo arrow) */
      .stage:not(:last-child)::after {
        content: '';
        position: absolute;
        right: -10px;
        top: 50%;
        translate: 0 -50%;
        width: 0;
        height: 0;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        border-left: 10px solid var(--pai-color-surface);
        z-index: 2;
      }
      .stage:not(:last-child)::before {
        content: '';
        position: absolute;
        right: -11px;
        top: 50%;
        translate: 0 -50%;
        width: 0;
        height: 0;
        border-top: 19px solid transparent;
        border-bottom: 19px solid transparent;
        border-left: 11px solid var(--pai-color-border);
        z-index: 1;
      }
      .stage[data-status='ok'] {
        background-color: color-mix(in srgb, var(--pai-color-success) 10%, var(--pai-color-surface));
        border-color: color-mix(in srgb, var(--pai-color-success) 28%, transparent);
      }
      .stage[data-status='ok']:not(:last-child)::after {
        border-left-color: color-mix(in srgb, var(--pai-color-success) 10%, var(--pai-color-surface));
      }
      .stage[data-status='warn'] {
        background-color: color-mix(in srgb, var(--pai-color-warning) 10%, var(--pai-color-surface));
        border-color: color-mix(in srgb, var(--pai-color-warning) 28%, transparent);
      }
      .stage[data-status='warn']:not(:last-child)::after {
        border-left-color: color-mix(in srgb, var(--pai-color-warning) 10%, var(--pai-color-surface));
      }
      .stage[data-status='crit'] {
        background-color: color-mix(in srgb, var(--pai-color-danger) 10%, var(--pai-color-surface));
        border-color: color-mix(in srgb, var(--pai-color-danger) 28%, transparent);
      }
      .stage[data-status='crit']:not(:last-child)::after {
        border-left-color: color-mix(in srgb, var(--pai-color-danger) 10%, var(--pai-color-surface));
      }
      .stage[data-status='active'] {
        background-color: color-mix(in srgb, var(--pai-color-primary) 10%, var(--pai-color-surface));
        border-color: color-mix(in srgb, var(--pai-color-primary) 28%, transparent);
      }
      .stage[data-status='active']:not(:last-child)::after {
        border-left-color: color-mix(in srgb, var(--pai-color-primary) 10%, var(--pai-color-surface));
      }
      .label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--pai-color-grey);
        font-weight: var(--pai-font-weight-semibold);
      }
      .value {
        font-size: var(--pai-font-size-sm);
        font-weight: var(--pai-font-weight-bold);
        color: var(--pai-color-text-strong);
        line-height: 1.2;
      }
    `,
  ];

  /** Ordered pipeline stages. */
  @property({ type: Array }) stages: PaiPipelineStage[] = [];

  render() {
    return html`
      ${this.stages.map(
        (stage) => html`
          <div class="stage" data-status=${stage.status} role="listitem">
            <span class="label">${stage.label}</span>
            ${stage.value ? html`<span class="value">${stage.value}</span>` : nothing}
          </div>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-pipeline': PaiPipeline;
  }
}
