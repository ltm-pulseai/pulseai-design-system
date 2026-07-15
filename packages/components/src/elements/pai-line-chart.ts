import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export interface PaiLineChartSeries {
  data: number[];
  color?: string;
  label?: string;
}

/**
 * @summary A lightweight SVG line chart with optional x-axis labels and horizontal grid lines.
 * Suitable for throughput/rate-over-time visualisations inside dashboard cards.
 */
@customElement('pai-line-chart')
export class PaiLineChart extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      svg {
        display: block;
        overflow: visible;
        width: 100%;
        height: auto;
      }
      .gridline {
        stroke: var(--pai-color-border);
        stroke-width: 0.5;
        stroke-dasharray: 3 3;
      }
      .series-line {
        fill: none;
        stroke-width: 1.5;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      .axis-label {
        font-size: 9px;
        fill: var(--pai-color-grey);
        font-family: var(--pai-family-sans, sans-serif);
      }
    `,
  ];

  /** One or more data series to plot. */
  @property({ type: Array }) series: PaiLineChartSeries[] = [];

  /** X-axis tick labels. */
  @property({ type: Array }) xlabels: string[] = [];

  @property({ type: Number }) width = 400;
  @property({ type: Number }) height = 100;

  private readonly _padX = 8;
  private readonly _padY = 14;

  private _toPoints(data: number[], allValues: number[]): string {
    if (data.length < 2) return '';
    const min = Math.min(...allValues, 0);
    const max = Math.max(...allValues, 1);
    const range = max - min || 1;
    const plotW = this.width - this._padX * 2;
    const plotH = this.height - this._padY * 2;
    const step = plotW / (data.length - 1);
    return data
      .map(
        (v, i) =>
          `${this._padX + i * step},${this._padY + plotH - ((v - min) / range) * plotH}`,
      )
      .join(' ');
  }

  render() {
    const allValues = this.series.flatMap((s) => s.data);
    const plotH = this.height - this._padY * 2;
    const defaultColors = [
      'var(--pai-color-primary)',
      'var(--pai-color-info)',
      'var(--pai-color-success)',
      'var(--pai-color-warning)',
    ];
    const gridFracs = [0.25, 0.5, 0.75, 1];
    const plotW = this.width - this._padX * 2;

    return html`
      <svg viewBox="0 0 ${this.width} ${this.height}" aria-label="Line chart" role="img">
        ${gridFracs.map(
          (f) =>
            svg`<line class="gridline"
              x1=${this._padX} x2=${this.width - this._padX}
              y1=${this._padY + plotH * (1 - f)}
              y2=${this._padY + plotH * (1 - f)}
            />`,
        )}
        ${this.series.map(
          (s, i) =>
            svg`<polyline
              class="series-line"
              style="stroke:${s.color ?? defaultColors[i % defaultColors.length]}"
              points=${this._toPoints(s.data, allValues)}
            />`,
        )}
        ${this.xlabels.map(
          (label, i) =>
            svg`<text
              class="axis-label"
              x=${this._padX + i * (plotW / Math.max(1, this.xlabels.length - 1))}
              y=${this.height - 2}
              text-anchor="middle"
            >${label}</text>`,
        )}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-line-chart': PaiLineChart;
  }
}
