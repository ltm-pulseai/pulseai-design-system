import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-dep-node.js';

const meta: Meta = {
  title: 'Elements/Atoms/DepNode',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Dependency-graph node chip with health-status color encoding.' },
    },
  },
  render: () => html`
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
      <pai-dep-node status="ok">Kafka</pai-dep-node>
      <pai-dep-node status="warn">S3 Sink</pai-dep-node>
      <pai-dep-node status="crit">Postgres</pai-dep-node>
      <pai-dep-node status="idle">Redshift</pai-dep-node>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
