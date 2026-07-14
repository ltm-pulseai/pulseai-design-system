import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-tags.js';
import '@pulseai/components/elements/pai-tag.js';

const meta: Meta = {
  title: 'Elements/Tags',
  tags: ['autodocs'],
  render: () => html`
    <pai-tags has-addons>
      <pai-tag color="danger">Package</pai-tag>
      <pai-tag>@pulseai/components</pai-tag>
    </pai-tags>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
