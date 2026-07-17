import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-timeline.js';

const items = [
  { time: '09:12:04 UTC', title: 'Ingest started', body: 'Pipeline received 8,420 rows from CloudWatch.', status: 'ok' as const },
  { time: '09:12:18 UTC', title: 'Schema warning', body: 'Unknown field "user_meta" skipped during parse.', status: 'warn' as const },
  { time: '09:13:02 UTC', title: 'Write error', body: 'Connection refused — Postgres retry #1 of 3.', status: 'crit' as const },
  { time: '09:14:15 UTC', title: 'Retry succeeded', body: 'All 8,420 rows committed to sink.', status: 'ok' as const },
];

const meta: Meta = {
  title: 'Components/Data/Timeline',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Vertical timeline for event/audit-log streams.' },
    },
  },
  render: () => html`
    <div style="max-width:480px;padding:1rem;">
      <pai-timeline .items=${items}></pai-timeline>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
