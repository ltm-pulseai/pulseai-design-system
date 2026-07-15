import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';
import '../elements/pai-sparkline.js';

export type PaiKpiTrend = 'up' | 'down' | 'neutral';

/**
 * @summary A KPI dashboard card with a large metric value, label, trend indicator, and
 * an optional inline sparkline. Composed from `pai-sparkline`.
 * @slot icon - Optional icon or emoji in the top-right corner.
 */
@customElement('pai-kpi-card')
export class PaiKpiCard extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        background-color: var(--pai-color-surface);
        border: 1px solid var(--pai-color-border);
        border-radius: var(--pai-radius-large);
        padding: var(--pai-space-md);
        box-shadow: var(--pai-shadow-normal);
      }
      .top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--pai-space-sm);
      }
      .label {
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--pai-color-grey);
        font-weight: var(--pai-font-weight-semibold);
      }
      .value {
        font-size: var(--pai-font-size-3xl, 2rem);
        font-weight: var(--pai-font-weight-bold);
        color: var(--pai-color-text-strong);
        line-height: 1.1;
        margin: var(--pai-space-xs) 0;
        letter-spacing: -0.01em;
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--pai-space-sm);
        margin-top: var(--pai-space-xs);
      }
      .trend {
        display: inline-flex;
        align-items: center;
        gap: 0.2em;
        font-size: var(--pai-font-size-xs);
        font-weight: var(--pai-font-weight-semibold);
        padding: 0.1em 0.45em;
        border-radius: var(--pai-radius-rounded);
      }
      .trend.up {
        background-color: color-mix(in srgb, var(--pai-color-success) 15%, transparent);
        color: var(--pai-color-success);
      }
      .trend.down {
        background-color: color-mix(in srgb, var(--pai-color-danger) 15%, transparent);
        color: var(--pai-color-danger);
      }
      .trend.neutral {
        background-color: var(--pai-color-white-ter);
        color: var(--pai-color-grey);
      }
    `,
  ];

  /** Primary metric value, e.g. "12,489" or "99.8%". */
  @property() value = '';

  /** Short metric label, e.g. "Active pipelines". */
  @property() label = '';

  /** Trend magnitude as a percentage, e.g. `12.5`. */
  @property({ type: Number }) trend?: number;

  /** Trend direction — controls arrow and badge color. */
  @property({ attribute: 'trend-direction' }) trendDirection: PaiKpiTrend = 'neutral';

  /** Data points for the inline sparkline (minimum 2 to render). */
  @property({ type: Array }) sparkdata: number[] = [];

  /** Sparkline filled area mode. */
  @property({ type: Boolean }) filled = true;

  render() {
    const arrows = { up: '↑', down: '↓', neutral: '→' };
    return html`
      <div class="top">
        <span class="label">${this.label}</span>
        <slot name="icon"></slot>
      </div>
      <div class="value">${this.value}</div>
      <div class="bottom">
        ${this.trend !== undefined
          ? html`
              <span class="trend ${this.trendDirection}">
                ${arrows[this.trendDirection]} ${Math.abs(this.trend)}%
              </span>
            `
          : nothing}
        ${this.sparkdata.length > 1
          ? html`
              <pai-sparkline
                .data=${this.sparkdata}
                width="80"
                height="26"
                ?filled=${this.filled}
              ></pai-sparkline>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-kpi-card': PaiKpiCard;
  }
}
