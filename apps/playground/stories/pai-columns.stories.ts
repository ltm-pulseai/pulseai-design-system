import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-columns.js';
import '@pulseai/components/layout/pai-column.js';
import '@pulseai/components/elements/pai-box.js';

const meta: Meta = {
  title: 'Layout/Columns',
  tags: ['autodocs'],
  render: () => html`
    <pai-columns>
      <pai-column><pai-box>Auto</pai-box></pai-column>
      <pai-column><pai-box>Auto</pai-box></pai-column>
      <pai-column size="half"><pai-box>Half</pai-box></pai-column>
    </pai-columns>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
