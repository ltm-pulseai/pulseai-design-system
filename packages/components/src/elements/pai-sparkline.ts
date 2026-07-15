import { html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PaiElement } from '../base/pai-element.js';

/**
 * @summary A minimal SVG polyline sparkline for use inside KPI cards and inline metric displays.
 */
@customElement('pai-sparkline')
export class PaiSparkline extends PaiElement {
  static styles = [
    PaiElement.styles,
    css`
      :host {
        display: inline-block;
        line-height: 0;
      }
      svg {
        display: block;
        overflow: visible;
      }
      polyline {
        fill: none;
        stroke: var(--pai-sparkline-color, var(--pai-color-primary));
        stroke-width: var(--pai-sparkline-stroke-width, 1.5);
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      .fill {
        stroke: none;
        fill: var(--pai-sparkline-color, var(--pai-color-primary));
        opacity: 0.12;
      }
    `,
  ];

  /** Array of numeric data points to plot. */
  @property({ type: Array }) data: number[] = [];

  /** Chart width in pixels. */
  @property({ type: Number }) width = 80;

  /** Chart height in pixels. */
  @property({ type: Number }) height = 28;

  /** Fill the area under the line. */
  @property({ type: Boolean }) filled = false;

  private _normalize(): { points: string; fillPath: string } {
    if (this.data.length < 2) return { points: '', fillPath: '' };
    const min = Math.min(...this.data);
    const max = Math.max(...this.data);
    const range = max - min || 1;
    const step = this.width / (this.data.length - 1);
    const pts = this.data.map((v, i) => ({
      x: i * step,
      y: this.height - ((v - min) / range) * this.height,
    }));
    const points = pts.map((p) => `${p.x},${p.y}`).join(' ');
    const first = pts[0]!;
    const last = pts[pts.length - 1]!;
    const fillPath = `M${first.x},${this.height} ` +
      pts.map((p) => `L${p.x},${p.y}`).join(' ') +
      ` L${last.x},${this.height} Z`;
    return { points, fillPath };
  }

  render() {
    const { points, fillPath } = this._normalize();
    return html`
      <svg
        width=${this.width}
        height=${this.height}
        viewBox="0 0 ${this.width} ${this.height}"
        aria-hidden="true"
      >
        ${this.filled && fillPath ? svg`<path class="fill" d=${fillPath}></path>` : ''}
        ${points ? svg`<polyline points=${points}></polyline>` : ''}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pai-sparkline': PaiSparkline;
  }
}
