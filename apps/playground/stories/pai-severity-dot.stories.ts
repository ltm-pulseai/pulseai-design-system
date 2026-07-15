import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-severity-dot.js';

const meta: Meta = {
  title: 'Elements/Atoms/SeverityDot',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'A small colored dot encoding log/alert severity at a glance.' },
    },
  },
  render: () => html`
    <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
      <span style="display:flex;align-items:center;gap:.4rem;font-size:.8rem;">
        <pai-severity-dot level="crit"></pai-severity-dot> Critical
      </span>
      <span style="display:flex;align-items:center;gap:.4rem;font-size:.8rem;">
        <pai-severity-dot level="warn"></pai-severity-dot> Warning
      </span>
      <span style="display:flex;align-items:center;gap:.4rem;font-size:.8rem;">
        <pai-severity-dot level="info"></pai-severity-dot> Info
      </span>
      <span style="display:flex;align-items:center;gap:.4rem;font-size:.8rem;">
        <pai-severity-dot level="ok"></pai-severity-dot> OK
      </span>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
