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
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft'],
    },
    rounded: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: { color: 'primary', variant: 'filled', rounded: false, dismissible: false },
  render: (args) => html`
    <pai-tag color=${args.color} variant=${args.variant} ?rounded=${args.rounded} ?dismissible=${args.dismissible}>Beta</pai-tag>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Dismissible: Story = { args: { dismissible: true } };

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <pai-tag color="primary" variant="filled">Filled</pai-tag>
      <pai-tag color="primary" variant="outlined">Outlined</pai-tag>
      <pai-tag color="primary" variant="soft">Soft</pai-tag>
    </div>
  `,
};
