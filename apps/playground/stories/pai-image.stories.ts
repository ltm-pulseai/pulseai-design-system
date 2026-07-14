import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-image.js';

const meta: Meta = {
  title: 'Elements/Image',
  tags: ['autodocs'],
  argTypes: { ratio: { control: 'text' }, rounded: { control: 'boolean' } },
  args: { ratio: '16x9', rounded: false },
  render: (args) => html`
    <pai-image
      src="https://placehold.co/320x180"
      alt="Placeholder"
      ratio=${args.ratio}
      ?rounded=${args.rounded}
      style="max-width: 320px;"
    ></pai-image>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Rounded: Story = { args: { ratio: '1x1', rounded: true } };
