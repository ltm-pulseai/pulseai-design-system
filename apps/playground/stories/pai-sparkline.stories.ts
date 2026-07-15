import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-sparkline.js';

const data = [12, 18, 14, 22, 19, 28, 25, 32, 30, 38, 35, 42];
const dataDown = [42, 38, 35, 30, 28, 24, 20, 18, 15, 12, 10, 8];

const meta: Meta = {
  title: 'Elements/Atoms/Sparkline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'A minimal SVG polyline sparkline for KPI cards and inline metrics.' },
    },
  },
  render: () => html`
    <div style="display:flex; gap:2rem; align-items:center; flex-wrap:wrap;">
      <div>
        <div style="font-size:.7rem;color:#888;margin-bottom:4px;">Up trend</div>
        <pai-sparkline .data=${data} width="100" height="32"></pai-sparkline>
      </div>
      <div>
        <div style="font-size:.7rem;color:#888;margin-bottom:4px;">Down trend (filled)</div>
        <pai-sparkline .data=${dataDown} width="100" height="32" filled></pai-sparkline>
      </div>
      <div>
        <div style="font-size:.7rem;color:#888;margin-bottom:4px;">Custom color</div>
        <pai-sparkline
          .data=${data}
          width="100"
          height="32"
          filled
          style="--pai-sparkline-color: var(--pai-color-success)"
        ></pai-sparkline>
      </div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
