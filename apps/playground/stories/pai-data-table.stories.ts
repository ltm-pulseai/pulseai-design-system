import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@pulseai/components/patterns/pai-data-table.js';
import '@pulseai/components/elements/pai-tag.js';
import type { PaiDataTableColumn } from '@pulseai/components';

const names = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Margaret Hamilton', 'Katherine Johnson', 'Barbara Liskov', 'Dennis Ritchie', 'Radia Perlman', 'Tim Berners-Lee', 'Shafi Goldwasser', 'Linus Torvalds', 'Ken Thompson'];
const rows = names.map((name, i) => ({
  id: i,
  name,
  role: i % 3 === 0 ? 'Engineer' : i % 3 === 1 ? 'Designer' : 'Manager',
  status: i % 4 === 0 ? 'Inactive' : 'Active',
}));

const plainColumns: PaiDataTableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const sortableColumns: PaiDataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true, align: 'center', width: '8rem' },
];

const customRenderColumns: PaiDataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    align: 'center',
    width: '8rem',
    render: (value) =>
      html`<pai-tag color=${value === 'Active' ? 'success' : 'default'} variant="soft">${value}</pai-tag>`,
  },
];

const meta: Meta = {
  title: 'Patterns/Organisms/DataTable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Composed from the `pai-search-bar` molecule plus `pai-table` and `pai-pagination` primitives — ' +
          'client-side filter, sort, select, and paginate. Column definitions (`sortable`, `align`, `width`, ' +
          '`render`) work like ag-grid\'s `colDefs`, scoped to what a design system needs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <pai-data-table .columns=${plainColumns} .rows=${rows} page-size="5" caption="Team members"></pai-data-table>
  `,
};

export const SortableColumns: Story = {
  parameters: {
    docs: {
      description: { story: 'Click a sortable column header to cycle ascending → descending → unsorted.' },
    },
  },
  render: () => html`
    <pai-data-table .columns=${sortableColumns} .rows=${rows} page-size="5" caption="Team members"></pai-data-table>
  `,
};

export const CustomCellRenderer: Story = {
  parameters: {
    docs: {
      description: { story: 'A column\'s `render(value, row)` can return any Lit-renderable value — here, `pai-tag` for status.' },
    },
  },
  render: () => html`
    <pai-data-table
      .columns=${customRenderColumns}
      .rows=${rows}
      page-size="5"
      caption="Team members"
    ></pai-data-table>
  `,
};

export const RowSelection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Set `selectable` for a checkbox column with header select-all/indeterminate state. Listen for ' +
          '`pai-selection-change` to read `event.detail.selectedRows`.',
      },
    },
  },
  render: () => html`
    <pai-data-table
      .columns=${sortableColumns}
      .rows=${rows}
      page-size="5"
      caption="Team members"
      selectable
      @pai-selection-change=${(e: CustomEvent<{ selectedRows: unknown[] }>) =>
        console.log('Selected rows:', e.detail.selectedRows)}
    ></pai-data-table>
  `,
};

export const FullyConfigured: Story = {
  parameters: {
    docs: {
      description: { story: 'Sorting, custom cell rendering, and row selection together — the ag-grid-style combination.' },
    },
  },
  render: () => html`
    <pai-data-table
      .columns=${customRenderColumns}
      .rows=${rows}
      page-size="5"
      caption="Team members"
      selectable
    ></pai-data-table>
  `,
};
