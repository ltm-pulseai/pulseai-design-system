import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-tool-call.js';
import '@pulseai/components/elements/pai-status-pill.js';

const body = `{
  "query": "SELECT * FROM logs WHERE level='ERROR' AND timestamp > now() - INTERVAL 1 HOUR",
  "limit": 100,
  "source": "cloudwatch"
}`;

const meta: Meta = {
  title: 'Elements/Molecules/ToolCall',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Inline MCP tool-call block rendered inside agent messages.' },
    },
  },
  render: () => html`
    <div style="max-width:520px;display:flex;flex-direction:column;gap:.75rem;">
      <pai-tool-call tool="query_logs">
        <pai-status-pill slot="status" status="ok">done</pai-status-pill>
        ${body}
      </pai-tool-call>
      <pai-tool-call tool="get_schema" open>
        <pai-status-pill slot="status" status="warn">running</pai-status-pill>
        { "source": "s3://logs-bucket/2025/07/" }
      </pai-tool-call>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
