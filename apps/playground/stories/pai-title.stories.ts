import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-title.js';
import '@pulseai/components/elements/pai-subtitle.js';

const meta: Meta = {
  title: 'Elements/Title',
  tags: ['autodocs'],
  render: () => html`
    <pai-title .level=${1}>Page title</pai-title>
    <pai-subtitle .level=${5}>A supporting subtitle</pai-subtitle>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
