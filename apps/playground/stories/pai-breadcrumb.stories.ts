import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/components/pai-breadcrumb.js';

const meta: Meta = {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  render: () => html`
    <pai-breadcrumb>
      <li><a href="#">Home</a></li>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Button</a></li>
    </pai-breadcrumb>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
