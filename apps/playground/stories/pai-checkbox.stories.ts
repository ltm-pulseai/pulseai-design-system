import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-checkbox.js';

const meta: Meta = {
  title: 'Form/Checkbox',
  tags: ['autodocs'],
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' } },
  args: { checked: false, disabled: false },
  render: (args) => html`
    <pai-checkbox ?checked=${args.checked} ?disabled=${args.disabled}>I agree to the terms</pai-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
