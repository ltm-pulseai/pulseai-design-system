import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import '../elements/pai-box.js';
import '../elements/pai-tag.js';

export type PaiStatTrend = 'up' | 'down' | 'neutral';

/**
 * @summary A dashboard stat/metric card — a molecule composed from `pai-box` and `pai-tag`.
 * @slot icon - Optional leading icon.
 */
@customElement('pai-stat-card')
export class PaiStatCard extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
      }
      pai-box {
        display: flex;
        flex-direction: column;
        gap: var(--pai-space-2);
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--pai-radius-normal);
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-primary);
      }
      .value {
        font-size: var(--pai-font-size-2);
        font-weight: var(--pai-font-weight-bold);
        color: var(--pai-color-text-strong);
      }
      .label {
        color: var(--pai-color-grey);
        font-size: var(--pai-font-size-7);
      }
    `,
  ];

  /** Main metric value, e.g. "12,489". */
  @property() value = '';

  /** Metric label, e.g. "Active users". */
  @property() label = '';

  /** Trend percentage shown in the badge, e.g. `12.5`. */
  @property({ type: Number }) trend?: number;

  /** Trend direction — controls the badge color and arrow. */
  @property({ attribute: 'trend-direction' }) trendDirection: PaiStatTrend = 'neutral';

  render() {
    const trendColor = this.trendDirection === 'up' ? 'success' : this.trendDirection === 'down' ? 'danger' : 'default';
    const arrow = this.trendDirection === 'up' ? '↑' : this.trendDirection === 'down' ? '↓' : '';
    return html`
      <pai-box>
        <div class="row">
          <div class="icon" aria-hidden="true"><slot name="icon"></slot></div>
          ${this.trend !== undefined
            ? html`<pai-tag color=${trendColor} rounded>${arrow} ${Math.abs(this.trend)}%</pai-tag>`
            : nothing}
        </div>
        <div class="value">${this.value}</div>
        <div class="label">${this.label}</div>
      </pai-box>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-stat-card': PaiStatCard;
  }
}
