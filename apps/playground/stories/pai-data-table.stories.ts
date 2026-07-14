import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-data-table.js';
import type { PaiDataTableColumn } from '@pulseai/components';

const columns: PaiDataTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const names = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Margaret Hamilton', 'Katherine Johnson', 'Barbara Liskov', 'Dennis Ritchie', 'Radia Perlman', 'Tim Berners-Lee', 'Shafi Goldwasser', 'Linus Torvalds', 'Ken Thompson'];
const rows = names.map((name, i) => ({
  name,
  role: i % 3 === 0 ? 'Engineer' : i % 3 === 1 ? 'Designer' : 'Manager',
  status: i % 4 === 0 ? 'Inactive' : 'Active',
}));

const meta: Meta = {
  title: 'Patterns/Organisms/DataTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composed from the `pai-search-bar` molecule plus `pai-table` and `pai-pagination` primitives — client-side filter + paginate.',
      },
    },
  },
  render: () => html`
    <pai-data-table .columns=${columns} .rows=${rows} page-size="5" caption="Team members"></pai-data-table>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
