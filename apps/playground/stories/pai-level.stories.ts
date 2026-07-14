import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-level.js';

const meta: Meta = {
  title: 'Layout/Level',
  tags: ['autodocs'],
  render: () => html`
    <pai-level>
      <strong slot="left">42 posts</strong>
      <span slot="right">Sort by date</span>
    </pai-level>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
