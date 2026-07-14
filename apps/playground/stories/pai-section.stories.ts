import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-section.js';

const meta: Meta = {
  title: 'Layout/Section',
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['normal', 'medium', 'large'] } },
  args: { size: 'normal' },
  render: (args) => html`
    <pai-section size=${args.size} style="background:var(--pai-color-white-ter);">Section content</pai-section>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
