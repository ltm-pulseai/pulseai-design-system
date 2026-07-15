import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-tool-card.js';
import '@pulseai/components/elements/pai-status-pill.js';
import '@pulseai/components/elements/pai-tag.js';

const meta: Meta = {
  title: 'Patterns/Molecules/ToolCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Generic integration/tool card with a name, optional subtitle (provider, version, category…), description, action slot, and a tag footer. Works for plugin catalogs, API directories, or any tool listing.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <pai-tool-card
        name="query_logs"
        subtitle="logs-server · read"
        description="Executes SQL-like queries against ingested log streams and returns matching events."
        style="width:240px;"
      >
        <span slot="icon">🔍</span>
        <pai-status-pill slot="action" color="success" dot>enabled</pai-status-pill>
        <pai-tag color="info" variant="soft" rounded>read</pai-tag>
      </pai-tool-card>
      <pai-tool-card
        name="create_alert"
        subtitle="alerts-server · write"
        description="Creates a new threshold-based alert rule from a natural-language prompt."
        style="width:240px;"
      >
        <span slot="icon">🔔</span>
        <pai-status-pill slot="action" color="default">disabled</pai-status-pill>
        <pai-tag color="warning" variant="soft" rounded>write</pai-tag>
      </pai-tool-card>
      <pai-tool-card
        name="stripe/payments"
        subtitle="Stripe · v2024-06-20"
        description="List charges, refunds, and subscription events from Stripe."
        style="width:240px;"
      >
        <span slot="icon">💳</span>
        <pai-status-pill slot="action" color="success" dot>enabled</pai-status-pill>
        <pai-tag color="primary" variant="soft" rounded>payments</pai-tag>
      </pai-tool-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
