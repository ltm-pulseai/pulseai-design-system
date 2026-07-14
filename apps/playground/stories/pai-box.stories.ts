import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-box.js';

const meta: Meta = {
  title: 'Elements/Box',
  tags: ['autodocs'],
  render: () => html`<pai-box>A padded, shadowed container.</pai-box>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
