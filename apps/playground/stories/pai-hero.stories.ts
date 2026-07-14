import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/layout/pai-hero.js';

const meta: Meta = {
  title: 'Layout/Hero',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'link', 'info', 'success', 'warning', 'danger'],
    },
    size: { control: 'select', options: ['normal', 'small', 'medium', 'large'] },
  },
  args: { color: 'primary', size: 'medium' },
  render: (args) => html`
    <pai-hero color=${args.color} size=${args.size}>
      <h1 style="margin:0;">Welcome to PulseAI</h1>
      <p>A Bulma-parity design system built with Lit.</p>
    </pai-hero>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
