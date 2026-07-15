import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-sidebar.js';

const sections = [
  {
    items: [
      { value: 'overview', label: 'Overview', icon: '⊞' },
      { value: 'ingest', label: 'Ingest', icon: '⬇', badge: '3' },
      { value: 'schema', label: 'Schema', icon: '⊡' },
    ],
  },
  {
    title: 'AI',
    items: [
      { value: 'mcp', label: 'MCP Tools', icon: '⚙' },
      { value: 'agents', label: 'Agents', icon: '🤖' },
      { value: 'portal', label: 'AI Portal', icon: '✦' },
    ],
  },
];

const meta: Meta = {
  title: 'Patterns/Navigation/Sidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Application sidebar with brand slot, nav sections, and pinned footer.' },
    },
  },
  render: () => html`
    <div style="height:480px;display:flex;">
      <pai-sidebar .sections=${sections} active="overview">
        <div slot="brand" style="font-weight:700;font-size:.95rem;">⚡ Lumen</div>
        <div slot="footer" style="font-size:.75rem;color:var(--pai-color-grey);">v2.4.0</div>
      </pai-sidebar>
      <div style="padding:1rem;font-size:.85rem;color:var(--pai-color-grey);">← Main content area</div>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
