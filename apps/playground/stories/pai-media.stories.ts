import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-media.js';

const meta: Meta = {
  title: 'Layout/Media',
  tags: ['autodocs'],
  render: () => html`
    <pai-media>
      <img slot="left" width="48" height="48" src="https://placehold.co/48" alt="" />
      <p><strong>Ada Lovelace</strong> — Great write-up, thanks for sharing!</p>
    </pai-media>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
