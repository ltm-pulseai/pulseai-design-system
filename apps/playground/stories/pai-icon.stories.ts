import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-icon.js';

const star = html`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>`;

const meta: Meta = {
  title: 'Elements/Icon',
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['small', 'normal', 'medium', 'large'] } },
  args: { size: 'normal' },
  render: (args) => html`<pai-icon size=${args.size} label="Star">${star}</pai-icon>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
