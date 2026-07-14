import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-progress.js';

const meta: Meta = {
  title: 'Elements/Progress',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'link', 'info', 'success', 'warning', 'danger'],
    },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: { color: 'primary' as any, value: 60 },
  render: (args) => html`<pai-progress color=${args.color} value=${args.value} label="Uploading"></pai-progress>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Indeterminate: Story = {
  render: () => html`<pai-progress color="info" label="Loading"></pai-progress>`,
};
