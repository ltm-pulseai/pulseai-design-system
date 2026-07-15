import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-pipeline.js';

const stages = [
  { label: 'Collect', status: 'ok' as const, value: '1.2M/s' },
  { label: 'Parse', status: 'ok' as const, value: '1.19M/s' },
  { label: 'Enrich', status: 'warn' as const, value: '1.15M/s' },
  { label: 'Route', status: 'ok' as const, value: '1.15M/s' },
  { label: 'Store', status: 'active' as const, value: '1.12M/s' },
];

const meta: Meta = {
  title: 'Components/Data/Pipeline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Horizontal pipeline showing ordered processing stages with chevron connectors.' },
    },
  },
  render: () => html`
    <div style="max-width:680px;">
      <pai-pipeline .stages=${stages}></pai-pipeline>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
