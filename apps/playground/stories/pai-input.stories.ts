import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-input.js';

const meta: Meta = {
  title: 'Form/Input',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] },
    color: { control: 'select', options: ['default', 'success', 'danger'] },
  },
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email', color: 'default' },
  render: (args) => html`
    <pai-input
      label=${args.label}
      placeholder=${args.placeholder}
      type=${args.type}
      color=${args.color}
      help-text="We'll never share your email."
    ></pai-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const WithError: Story = {
  render: () => html`<pai-input label="Email" value="not-an-email" color="danger" error-text="Enter a valid email address"></pai-input>`,
};
