import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-delete.js';

const meta: Meta = {
  title: 'Elements/Delete',
  tags: ['autodocs'],
  render: () => html`<pai-delete label="Close"></pai-delete>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
