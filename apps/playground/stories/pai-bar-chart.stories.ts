import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-bar-chart.js';

const bars = [
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 380 },
  { label: 'Wed', value: 510 },
  { label: 'Thu', value: 290 },
  { label: 'Fri', value: 640 },
  { label: 'Sat', value: 180 },
  { label: 'Sun', value: 220 },
];

const meta: Meta = {
  title: 'Elements/Charts/BarChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Simple SVG bar chart for log-volume and error-rate metrics.' },
    },
  },
  render: () => html`
    <div style="max-width:420px;padding:1rem;background:var(--pai-color-surface);border-radius:8px;border:1px solid var(--pai-color-border);">
      <pai-bar-chart .bars=${bars} width="380" height="90"></pai-bar-chart>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
