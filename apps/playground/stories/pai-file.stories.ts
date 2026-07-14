import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/form/pai-file.js';

const meta: Meta = {
  title: 'Form/File',
  tags: ['autodocs'],
  render: () => html`<pai-file label="Choose a file…" name="avatar"></pai-file>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
