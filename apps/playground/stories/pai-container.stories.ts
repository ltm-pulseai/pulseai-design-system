import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-container.js';

const meta: Meta = {
  title: 'Layout/Container',
  tags: ['autodocs'],
  argTypes: { fluid: { control: 'boolean' } },
  args: { fluid: false },
  render: (args) => html`
    <pai-container ?fluid=${args.fluid} style="background:var(--pai-color-white-ter);">
      Centered, width-constrained content.
    </pai-container>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Fluid: Story = { args: { fluid: true } };
