import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-content.js';

const meta: Meta = {
  title: 'Elements/Content',
  tags: ['autodocs'],
  render: () => html`
    <pai-content>
      <h3>Rich text</h3>
      <p>Paragraphs, lists, and blockquotes all get consistent spacing.</p>
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
      <blockquote>A quoted passage.</blockquote>
    </pai-content>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
