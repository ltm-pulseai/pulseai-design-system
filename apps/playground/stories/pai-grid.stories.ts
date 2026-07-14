import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-grid.js';
import '@pulseai/components/layout/pai-cell.js';
import '@pulseai/components/elements/pai-box.js';

const meta: Meta = {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  render: () => html`
    <pai-grid min-col-width="8rem">
      <pai-cell><pai-box>1</pai-box></pai-cell>
      <pai-cell col-span="2"><pai-box>2 (spans 2)</pai-box></pai-cell>
      <pai-cell><pai-box>3</pai-box></pai-cell>
      <pai-cell><pai-box>4</pai-box></pai-cell>
    </pai-grid>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
