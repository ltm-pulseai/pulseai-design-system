import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-select.js';
import type { PaiSelect } from '@pulseai/components';

const meta: Meta = {
  title: 'Form/Select',
  tags: ['autodocs'],
  render: () => html`
    <pai-select
      label="Country"
      placeholder="Select a country"
      .options=${[
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'mx', label: 'Mexico' },
      ] satisfies PaiSelect['options']}
    ></pai-select>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
