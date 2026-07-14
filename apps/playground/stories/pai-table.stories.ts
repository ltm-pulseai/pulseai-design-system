import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/elements/pai-table.js';

const meta: Meta = {
  title: 'Elements/Table',
  tags: ['autodocs'],
  argTypes: { bordered: { control: 'boolean' }, striped: { control: 'boolean' }, hoverable: { control: 'boolean' } },
  args: { bordered: false, striped: true, hoverable: true },
  render: (args) => html`
    <pai-table ?bordered=${args.bordered} ?striped=${args.striped} ?hoverable=${args.hoverable}>
      <table>
        <caption>Team members</caption>
        <thead><tr><th>Name</th><th>Role</th></tr></thead>
        <tbody>
          <tr><td>Ada Lovelace</td><td>Engineer</td></tr>
          <tr><td>Grace Hopper</td><td>Engineer</td></tr>
        </tbody>
      </table>
    </pai-table>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
