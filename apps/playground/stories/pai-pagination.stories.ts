import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-pagination.js';

const meta: Meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
  },
  args: { page: 4, totalPages: 12 },
  render: (args) => html`<pai-pagination .page=${args.page} total-pages=${args.totalPages}></pai-pagination>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
