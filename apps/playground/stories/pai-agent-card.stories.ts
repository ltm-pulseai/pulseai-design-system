import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-agent-card.js';
import '@pulseai/components/elements/pai-status-pill.js';
import '@pulseai/components/elements/pai-tag.js';

const meta: Meta = {
  title: 'Patterns/Molecules/AgentCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Generic agent/service card with a colored glow accent. Uses the same `color` vocabulary as every other PAI component — no domain-specific role names.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:1rem;flex-wrap:wrap;">
      <pai-agent-card
        color="danger"
        name="Root Cause Analyser"
        description="Correlates anomalies and log patterns to surface probable root causes."
        style="width:220px;"
      >
        <span slot="icon">🔍</span>
        <pai-status-pill slot="meta" color="success" dot>active</pai-status-pill>
      </pai-agent-card>
      <pai-agent-card
        color="warning"
        name="Anomaly Detector"
        description="Continuously monitors metrics for statistical outliers."
        style="width:220px;"
      >
        <span slot="icon">📈</span>
        <pai-status-pill slot="meta" color="warning" dot>training</pai-status-pill>
      </pai-agent-card>
      <pai-agent-card
        color="success"
        name="Cost Optimiser"
        description="Recommends retention and compression rules to reduce storage costs."
        style="width:220px;"
      >
        <span slot="icon">💰</span>
        <pai-status-pill slot="meta" color="success" dot>active</pai-status-pill>
      </pai-agent-card>
      <pai-agent-card
        color="primary"
        name="Support Assistant"
        description="Answers customer questions by searching runbooks and incident history."
        style="width:220px;"
      >
        <span slot="icon">💬</span>
        <pai-tag color="info" variant="soft" rounded>beta</pai-tag>
      </pai-agent-card>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
