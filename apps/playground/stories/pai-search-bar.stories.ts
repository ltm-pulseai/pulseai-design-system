import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-search-bar.js';

const meta: Meta = {
  title: 'Patterns/Molecules/SearchBar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Composed from `pai-input` + `pai-button` — a molecule built from two primitives.',
      },
    },
  },
  render: () => html`<pai-search-bar placeholder="Search components…"></pai-search-bar>`,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
