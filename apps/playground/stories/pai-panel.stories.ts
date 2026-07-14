import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-panel.js';

const meta: Meta = {
  title: 'Components/Panel',
  tags: ['autodocs'],
  render: () => html`
    <pai-panel heading="Repositories" style="max-width: 320px;">
      <a href="#">pulseai-design-system</a>
      <a href="#">pulseai-tokens</a>
      <a href="#">pulseai-icons</a>
    </pai-panel>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
