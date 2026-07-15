import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-env-pill.js';

const meta: Meta = {
  title: 'Elements/Atoms/EnvPill',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Environment status pill for top navigation bars.' },
    },
  },
  render: () => html`
    <div style="display:flex;gap:.75rem;align-items:center;flex-wrap:wrap;">
      <pai-env-pill env="prod">production</pai-env-pill>
      <pai-env-pill env="staging">staging</pai-env-pill>
      <pai-env-pill env="dev">development</pai-env-pill>
      <pai-env-pill env="local">local</pai-env-pill>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
