import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-footer.js';

const meta: Meta = {
  title: 'Layout/Footer',
  tags: ['autodocs'],
  render: () => html`<pai-footer>© 2026 PulseAI. All rights reserved.</pai-footer>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
