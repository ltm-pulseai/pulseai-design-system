import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-schema-viewer.js';

const fields = [
  { name: 'timestamp', type: 'string', mapped: 'event_time', nullable: false },
  { name: 'level', type: 'string', mapped: 'severity', nullable: false },
  { name: 'message', type: 'string', mapped: 'body', nullable: false },
  { name: 'service', type: 'string', mapped: 'service_name', nullable: true },
  { name: 'trace_id', type: 'string', mapped: undefined, nullable: true },
  { name: 'user_meta', type: 'object', mapped: undefined, nullable: true },
];

const meta: Meta = {
  title: 'Elements/Data/SchemaViewer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Tabular schema-field viewer for log ingestion mapping UIs.' },
    },
  },
  render: () => html`
    <div style="max-width:640px;">
      <pai-schema-viewer .fields=${fields}></pai-schema-viewer>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
