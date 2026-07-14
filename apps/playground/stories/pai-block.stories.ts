import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-block.js';

const meta: Meta = {
  title: 'Elements/Block',
  tags: ['autodocs'],
  render: () => html`
    <pai-block>First block</pai-block>
    <pai-block>Second block</pai-block>
    <pai-block>Last block — no trailing margin</pai-block>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
