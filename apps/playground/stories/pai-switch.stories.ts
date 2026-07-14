import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-switch.js';

const meta: Meta = {
  title: 'Form/Switch',
  tags: ['autodocs'],
  argTypes: { checked: { control: 'boolean' } },
  args: { checked: true },
  render: (args) => html`<pai-switch ?checked=${args.checked}>Email notifications</pai-switch>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
