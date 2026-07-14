import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-notification.js';

const meta: Meta = {
  title: 'Elements/Notification',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'link', 'info', 'success', 'warning', 'danger'],
    },
    dismissible: { control: 'boolean' },
  },
  args: { color: 'success', dismissible: true },
  render: (args) => html`
    <pai-notification color=${args.color} ?dismissible=${args.dismissible}>
      Your changes have been saved.
    </pai-notification>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
