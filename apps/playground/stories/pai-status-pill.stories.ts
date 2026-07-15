import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-status-pill.js';

const meta: Meta = {
  title: 'Elements/Atoms/StatusPill',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact status badge using the same `color` vocabulary as `pai-button` and `pai-tag` — default / primary / info / success / warning / danger.',
      },
    },
  },
  render: () => html`
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;">
      <pai-status-pill color="default">default</pai-status-pill>
      <pai-status-pill color="primary" dot>primary</pai-status-pill>
      <pai-status-pill color="info" dot>info</pai-status-pill>
      <pai-status-pill color="success" dot>success</pai-status-pill>
      <pai-status-pill color="warning" dot>warning</pai-status-pill>
      <pai-status-pill color="danger" dot>danger</pai-status-pill>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
