import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-kpi-card.js';

const upData = [12, 18, 14, 22, 19, 28, 25, 32, 30, 38, 35, 42];
const downData = [42, 38, 35, 30, 28, 24, 20, 18, 15, 12, 10, 8];

const meta: Meta = {
  title: 'Patterns/Molecules/KpiCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'KPI dashboard card with sparkline, trend badge, and metric value.' },
    },
  },
  render: () => html`
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <pai-kpi-card
        value="1.2M/s"
        label="Ingest throughput"
        .trend=${8.4}
        trend-direction="up"
        .sparkdata=${upData}
        style="width:200px;"
      ></pai-kpi-card>
      <pai-kpi-card
        value="99.8%"
        label="Pipeline uptime"
        .trend=${0.1}
        trend-direction="down"
        .sparkdata=${downData}
        style="width:200px;--pai-sparkline-color:var(--pai-color-danger);"
      ></pai-kpi-card>
      <pai-kpi-card
        value="42 ms"
        label="Median latency"
        style="width:200px;"
      ></pai-kpi-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
