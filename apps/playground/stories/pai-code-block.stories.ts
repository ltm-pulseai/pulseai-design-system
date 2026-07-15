import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-code-block.js';

const logSample = `2025-07-14T09:12:04.312Z  INFO  pipeline.ingest  rows_received=8420
2025-07-14T09:12:04.318Z  WARN  schema.parser    unknown_field="user_meta" skipped=true
2025-07-14T09:12:04.321Z  ERROR pipeline.write   connection_refused retries=3`;

const jsonSample = `{
  "source": "cloudwatch",
  "region": "us-east-1",
  "logGroup": "/aws/lambda/ingest-fn",
  "events": 8420
}`;

const meta: Meta = {
  title: 'Elements/Atoms/CodeBlock',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Monospace code/log block with an optional language header.' },
    },
  },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:1rem;max-width:640px;">
      <pai-code-block lang="log">${logSample}</pai-code-block>
      <pai-code-block lang="json" filename="payload.json">${jsonSample}</pai-code-block>
      <pai-code-block lang="text" no-header>Plain text without header bar.</pai-code-block>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
