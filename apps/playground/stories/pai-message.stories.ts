import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-message.js';

const meta: Meta = {
  title: 'Components/Message',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'link', 'info', 'success', 'warning', 'danger'],
    },
    dismissible: { control: 'boolean' },
  },
  args: { color: 'danger', dismissible: true },
  render: (args) => html`
    <pai-message color=${args.color} ?dismissible=${args.dismissible}>
      <span slot="header">Error</span>
      Something went wrong while saving your changes.
    </pai-message>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
