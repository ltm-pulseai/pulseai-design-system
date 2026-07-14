import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-label.js';
import '@pulseai/components/form/pai-help.js';

const meta: Meta = {
  title: 'Form/Label & Help',
  tags: ['autodocs'],
  render: () => html`
    <pai-label>Section heading</pai-label>
    <pai-help color="danger">This field is required.</pai-help>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
