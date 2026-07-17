import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

export interface PaiBarChartBar {
  label: string;
  value: number;
  color?: string;
}

/**
 * @summary A simple SVG bar chart with labelled bars. Suitable for any single-series
 * metric that fits in a dashboard card.
 */
@customElement('pai-bar-chart')
export class PaiBarChart extends PaiElement {
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
      .bar-label {
        font-size: 9px;
        fill: var(--pai-color-grey);
        font-family: var(--pai-family-sans, sans-serif);
      }
    `,
  ];

  /** Bar data — each item needs at least `label` and `value`. */
  @property({ type: Array }) bars: PaiBarChartBar[] = [];

  @property({ type: Number }) width = 300;
  @property({ type: Number }) height = 80;

  /** Default fill color for bars that don't specify their own. */
  @property({ attribute: 'bar-color' }) barColor = 'var(--pai-color-primary)';

  render() {
    if (!this.bars.length) return html``;
    const max = Math.max(...this.bars.map((b) => b.value), 1);
    const gap = this.width / this.bars.length;
    const bw = gap * 0.65;
    const chartH = this.height - 14;

    return html`
      <svg viewBox="0 0 ${this.width} ${this.height}" aria-label="Bar chart" role="img">
        ${this.bars.map((bar, i) => {
          const bh = Math.max(2, (bar.value / max) * chartH);
          const x = i * gap + (gap - bw) / 2;
          return svg`
            <rect
              x=${x} y=${chartH - bh}
              width=${bw} height=${bh}
              rx="3" ry="3"
              fill=${bar.color ?? this.barColor}
              opacity="0.82"
            />
            <text
              class="bar-label"
              x=${x + bw / 2}
              y=${this.height - 2}
              text-anchor="middle"
            >${bar.label}</text>
          `;
        })}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-bar-chart': PaiBarChart;
  }
}
