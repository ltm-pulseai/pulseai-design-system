import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-source-chip.js';

const meta: Meta = {
  title: 'Elements/Atoms/SourceChip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Numbered superscript citation chip for AI-generated answers.' },
    },
  },
  render: () => html`
    <p style="font-size:.9rem;line-height:1.7;">
      The pipeline ingested 1.2 M events in the last 24 h
      <pai-source-chip n="1"></pai-source-chip>
      with a median latency of 42 ms
      <pai-source-chip n="2"></pai-source-chip>
      and zero parse errors
      <pai-source-chip n="3"></pai-source-chip>.
    </p>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
