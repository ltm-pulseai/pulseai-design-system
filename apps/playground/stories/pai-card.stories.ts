import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-card.js';
import '@pulseai/components/elements/pai-image.js';
import '@pulseai/components/elements/pai-button.js';

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: () => html`
    <pai-card style="max-width: 320px;">
      <pai-image slot="image" ratio="16x9" src="https://placehold.co/320x180" alt=""></pai-image>
      <strong slot="header">Card title</strong>
      <p>Some supporting card content goes here.</p>
      <pai-button slot="footer" color="primary" size="small">Learn more</pai-button>
    </pai-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
