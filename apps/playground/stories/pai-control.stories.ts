import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-control.js';
import '@pulseai/components/form/pai-input.js';

const meta: Meta = {
  title: 'Form/Control',
  tags: ['autodocs'],
  argTypes: { loading: { control: 'boolean' } },
  args: { loading: true },
  render: (args) => html`
    <pai-control ?loading=${args.loading}>
      <pai-input placeholder="Loading…"></pai-input>
    </pai-control>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
