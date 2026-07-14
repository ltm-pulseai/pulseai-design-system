import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-stat-card.js';

const chart = html`<svg slot="icon" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 17l6-6 4 4 8-8v3l-8 8-4-4-6 6z"/></svg>`;

const meta: Meta = {
  title: 'Patterns/Molecules/StatCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Composed from `pai-box` + `pai-tag` — a molecule for dashboard metrics.' },
    },
  },
  render: () => html`
    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
      <pai-stat-card value="12,489" label="Active users" .trend=${12.5} trend-direction="up" style="width:14rem;">
        ${chart}
      </pai-stat-card>
      <pai-stat-card value="3.2%" label="Churn rate" .trend=${1.8} trend-direction="down" style="width:14rem;">
        ${chart}
      </pai-stat-card>
      <pai-stat-card value="$48,200" label="MRR" style="width:14rem;">${chart}</pai-stat-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
