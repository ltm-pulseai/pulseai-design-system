import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-textarea.js';

const meta: Meta = {
  title: 'Form/Textarea',
  tags: ['autodocs'],
  args: { label: 'Bio', placeholder: 'Tell us about yourself', rows: 4 },
  render: (args) => html`
    <pai-textarea label=${args.label} placeholder=${args.placeholder} rows=${args.rows}></pai-textarea>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
