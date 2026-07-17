import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-ask-panel.js';

const meta: Meta = {
  title: 'Components/Overlay/AskPanel',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Modal command-palette / AI ask overlay. Click the button to open.' },
    },
  },
  render: () => {
    const toggle = () => {
      const panel = document.querySelector('pai-ask-panel') as HTMLElement & { open: boolean };
      if (panel) panel.open = !panel.open;
    };
    return html`
      <button @click=${toggle} style="padding:.5rem 1rem;border-radius:6px;border:1px solid var(--pai-color-border);cursor:pointer;background:var(--pai-color-surface);">
        Open Ask Panel
      </button>
      <pai-ask-panel placeholder="Ask anything about your logs…">
        <div style="padding:.25rem .5rem;border-radius:6px;border:1px solid var(--pai-color-border);cursor:pointer;font-size:.82rem;">
          Show me errors from the last hour
        </div>
        <div style="padding:.25rem .5rem;border-radius:6px;border:1px solid var(--pai-color-border);cursor:pointer;font-size:.82rem;">
          What caused the latency spike at 09:12 UTC?
        </div>
        <div style="padding:.25rem .5rem;border-radius:6px;border:1px solid var(--pai-color-border);cursor:pointer;font-size:.82rem;">
          Summarise pipeline health for today
        </div>
      </pai-ask-panel>
    `;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
