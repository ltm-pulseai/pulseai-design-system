import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-line-chart.js';

const series = [
  { data: [120, 180, 140, 220, 190, 280, 250, 320, 300, 380, 350, 420], label: 'Ingest' },
  { data: [80, 100, 95, 140, 120, 160, 150, 190, 180, 220, 210, 240], label: 'Parse' },
];
const xlabels = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
                  '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];

const meta: Meta = {
  title: 'Elements/Charts/LineChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Lightweight SVG line chart for throughput and rate-over-time data.' },
    },
  },
  render: () => html`
    <div style="max-width:640px;padding:1rem;background:var(--pai-color-surface);border-radius:8px;border:1px solid var(--pai-color-border);">
      <pai-line-chart .series=${series} .xlabels=${xlabels} width="600" height="120"></pai-line-chart>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
