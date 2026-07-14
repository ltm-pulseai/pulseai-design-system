import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-alert-banner.js';
import '@pulseai/components/elements/pai-button.js';

const warningIcon = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L1 21h22L12 2zm0 4.5L19.5 19h-15L12 6.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>`;

const meta: Meta = {
  title: 'Patterns/Molecules/AlertBanner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Composed from `pai-delete` + icon/message/action slots — a richer sibling of `pai-notification`.',
      },
    },
  },
  render: () => html`
    <pai-alert-banner color="warning" dismissible>
      <span slot="icon">${warningIcon}</span>
      Your storage is almost full. Upgrade your plan to keep uploading files.
      <pai-button slot="actions" color="warning" size="small">Upgrade plan</pai-button>
      <pai-button slot="actions" size="small" variant="outlined">Dismiss</pai-button>
    </pai-alert-banner>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
