import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-tag.js';

const meta: Meta = {
  title: 'Elements/Tag',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'link', 'info', 'success', 'warning', 'danger'],
    },
    rounded: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: { color: 'primary', rounded: false, dismissible: false },
  render: (args) => html`
    <pai-tag color=${args.color} ?rounded=${args.rounded} ?dismissible=${args.dismissible}>Beta</pai-tag>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Dismissible: Story = { args: { dismissible: true } };
