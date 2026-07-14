import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-tile.js';
import '@pulseai/components/elements/pai-box.js';

const meta: Meta = {
  title: 'Layout/Tile',
  tags: ['autodocs'],
  render: () => html`
    <pai-tile variant="ancestor">
      <pai-tile variant="parent" size="6">
        <pai-tile variant="child"><pai-box>Left</pai-box></pai-tile>
      </pai-tile>
      <pai-tile variant="parent" size="6">
        <pai-tile variant="child"><pai-box>Right</pai-box></pai-tile>
      </pai-tile>
    </pai-tile>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
