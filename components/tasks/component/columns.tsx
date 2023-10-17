import { ColumnDef } from "@tanstack/react-table"
import { Badge } from '@/components/ui/badge'
import { unit, prod_line, data_test, status_item, level, status_p_m } from '../data/data'
import { Task } from "../data/schema"
import { DataTableColumnHeader, DataTableColumnHeaderFilter, DataTableColumnHeaderFacetedFilter } from "./data-table-column-header"
import { Button } from "@/components/ui/button"
import { CreateUrl } from "@/supabase/storage"
import { FileSearch } from 'lucide-react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { DataTableRowActions, DataTableRowActionsPack } from "./data-table-row-actions"
const handleOpenfile = async (namefile: string, folderName: string) => CreateUrl(namefile, folderName);

const statusTestColor = (text: string) => {
  if (text === 'YES') {
    return <CheckCircle color='#28D39A' />
  }
  else if (text === 'NO') {
    return <XCircle color='red' />
  }
  else {
    return <HelpCircle color='#facc15' />
  }
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "search",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="search" columnName='search' className="w-[200px]" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("search")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//search
  {
    accessorKey: "id_item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id_item" columnName='id_item' className="w-[200px]" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("id_item")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//id_item
  {
    accessorKey: "um",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="um" options={unit} className='w-[80px]' />
    },
    cell: ({ row }) => {

      const status = unit.find(
        (status) => status.value === row.getValue("um")
      )
      if (!status) {
        return null
      }

      return (
        <div className="flex w-[56px] items-center">
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//um
  {
    accessorKey: "prod_line",
    header: ({ column }) => (
      <DataTableColumnHeaderFacetedFilter column={column} title="prod_line" options={prod_line} className='w-[95px]' />
    ),
    cell: ({ row }) => {
      const status = prod_line.find(
        (status) => status.value === row.getValue("prod_line")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[95px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//prod_line
  {
    accessorKey: "description",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="description" table={table} columnName={'description'} className='w-80' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-80 truncate ">
          {row.getValue("description")}
        </span>
      )
    },
  },//description
  {
    accessorKey: "bom_release",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="bom_release" table={table} columnName={'bom_release'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("bom_release")}
          </span>
        </div>
      )
    },
  },//bom_release
  {
    accessorKey: "unit_cost",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="unit_cost" table={table} columnName={'unit_cost'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("unit_cost")}
          </span>
        </div>
      )
    },
  },//unit_cost
  {
    accessorKey: "pack_std",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="pack_std" table={table} columnName={'pack_std'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("pack_std")}
          </span>
        </div>
      )
    },
  },//pack_std
  {
    accessorKey: "cubic_foot",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="cubic_foot" table={table} columnName={'cubic_foot'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("cubic_foot")}
          </span>
        </div>
      )
    },
  },//cubic_foot
  {
    accessorKey: "supply_name",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="supply_name" table={table} columnName={'supply_name'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("supply_name")}
          </span>
        </div>
      )
    },
  },//supply_name
  {
    accessorKey: "status_item",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="status_item" table={table} columnName={'status_item'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("status_item")}
          </span>
        </div>
      )
    },
  },//status_item
]

export const columnsDocx: ColumnDef<Task>[] = [
  {
    accessorKey: "item_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="item_number" className='w-[200px]' />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("item_number")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//item_number
  {
    accessorKey: "status_test",
    header: ({ column }) => (
      <DataTableColumnHeaderFacetedFilter column={column} title="status_test" options={data_test} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      const status = data_test.find(
        (status) => status.value === row.getValue("status_test")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[130px] items-center">
          <Badge variant="outline" className="flex justify-center items-center">
            {statusTestColor(status.label)}  <p className="ml-1"> {status.label} </p>
          </Badge>
          {/* <span>{status.label}</span> */}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//status_test
  {
    accessorKey: "prod_area",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="prod_area" table={table} columnName={'prod_area'} className='w-[130px]' />

    ),
    cell: ({ row }) => {
      return (
        <span className="w-[130px] truncate ">
          {row.getValue("prod_area")}
        </span>
      )
    },
  },//prod_area
  {
    accessorKey: "prod_unit",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="prod_unit" table={table} columnName={'prod_unit'} className='w-[130px]' />

    ),
    cell: ({ row }) => {
      return (
        <span className="w-[130px] truncate ">
          {row.getValue("prod_unit")}
        </span>
      )
    },
  },//prod_unit
  {
    accessorKey: "docx_test",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="docx_test" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("docx_test") ?
            <Button onClick={() => handleOpenfile(row.getValue("docx_test"), 'work_test')} className="max-w-[500px] truncate h-9" style={{ background: '#3b82f6' }}>
              <FileSearch />
            </Button> : null}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//docx_test

]

export const columnsDocxECO: ColumnDef<Task>[] = [
  {
    accessorKey: "id_eco",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id_eco" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("id_eco")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//id_eco
  {
    accessorKey: "master_item",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="master_item" table={table} columnName={'master_item'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]truncate ">
            {row.getValue("master_item")}
          </span>
        </div>
      )
    },
  },//master_item
  {
    accessorKey: "parent_item",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="parent_item" table={table} columnName={'parent_item'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]truncate ">
            {row.getValue("parent_item")}
          </span>
        </div>
      )
    },
  },//parent_item
  {
    accessorKey: "item_number",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="item_number" table={table} columnName={'item_number'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("item_number")}
          </span>
        </div>
      )
    },
  },//item_number
  {
    accessorKey: "end_effective",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="end_effective" table={table} columnName={'end_effective'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("end_effective")}
          </span>
        </div>
      )
    },
  },//end_effective
  {
    accessorKey: "document_eco",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="document_eco" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">

          <Button onClick={() => handleOpenfile(row.getValue("document_eco"), 'doc_eco')} className="max-w-[500px] truncate h-9" style={{ background: '#3b82f6' }}>
            <FileSearch />

          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//document_eco
  {
    accessorKey: "user_eco",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="user_eco" table={table} columnName={'user_eco'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("user_eco")}
          </span>
        </div>
      )
    },
  },//user_eco
]

export const columnsBom: ColumnDef<Task>[] = [
  {
    accessorKey: "address",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="address" table={table} columnName={'address'} className='w-[100px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[100px] truncate ">
          {row.getValue("address")}
        </span>
      )
    },
  },//address
  {
    accessorKey: "item_number",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="item_number" table={table} columnName={'item_number'} className='w-[150px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[150px] truncate ">
          {row.getValue("item_number")}
        </span>
      )
    },
  },//item_number
  {
    accessorKey: "level",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="level" options={level} className='w-[65px]' />
    },
    cell: ({ row }) => {
      const status = level.find(
        (status) => status.value === row.getValue("level")
      )


      if (!status) {
        return null
      }

      return (
        <div className="flex w-[65px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//level
  {
    accessorKey: "start_effective",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="start_effective" table={table} columnName={'start_effective'} className='w-[140px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[140px] truncate ">
          {row.getValue("start_effective")}
        </span>
      )
    },
  },//start_effective
  {
    accessorKey: "qty_per",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="qty_per" table={table} columnName={'qty_per'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[130px] truncate ">
          {row.getValue("qty_per")}
        </span>
      )
    },
  },//qty_per
  {
    accessorKey: "um",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="um" options={unit} className='w-[55px]' />
    },
    cell: ({ row }) => {
      const status = unit.find(
        (status) => status.value === row.getValue("um")
      )


      if (!status) {
        return null
      }

      return (
        <div className="flex w-[55px] items-center">
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//um
  {
    accessorKey: "p_m",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="p_m" options={status_p_m} className='w-[55px]' />
    },
    cell: ({ row }) => {
      const status = status_p_m.find(
        (status) => status.value === row.getValue("p_m")
      )


      if (!status) {
        return null
      }

      return (
        <div className="flex w-[55px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//p_m
  {
    accessorKey: "description",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="description" table={table} columnName={'description'} className='w-80' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-80 truncate ">
          {row.getValue("description")}
        </span>
      )
    },
  },//description
  {
    accessorKey: "prod_line",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="prod_line" options={prod_line} className='w-[90px]' />
    },
    cell: ({ row }) => {
      const status = prod_line.find(
        (status) => status.value === row.getValue("prod_line")
      )


      if (!status) {
        return null
      }

      return (
        <div className="flex w-[90px] items-center">
          {/* {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )} */}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//prod_line
  {
    accessorKey: "remarks",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="remarks" table={table} columnName={'remarks'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[130px] truncate ">
          {row.getValue("remarks")}
        </span>
      )
    },
  },//remarks
  {
    accessorKey: "end_effective",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="end_effective" table={table} columnName={'end_effective'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <span className="w-[130px] truncate ">
          {row.getValue("end_effective")}
        </span>
      )
    },
  },//end_effective
  {
    accessorKey: "status_item",
    header: ({ column }) => {
      return <DataTableColumnHeaderFacetedFilter column={column} title="status_item" options={status_item} className='w-[100px]' />
    },
    cell: ({ row }) => {
      const status = status_item.find(
        (status) => status.value === row.getValue("status_item")
      )


      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },//status_item
  {
    accessorKey: "document_eco",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="document_eco" table={table} columnName={'document_eco'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("docx_test") ?
            <Button onClick={() => handleOpenfile(row.getValue("document_eco"), 'doc_eco')} className="max-w-[500px] truncate h-7 p-2 " style={{ background: '#3b82f6' }}>
              <FileSearch className='w-5' />
            </Button> : null}
        </div>
      )
    },
  },//document_eco
]

export const columnRevise: ColumnDef<Task>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="address" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("address")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//address
  {
    accessorKey: "parent_item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="parent_item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]truncate whitespace-nowrap">
            {row.getValue("parent_item")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//parent_item
  {
    accessorKey: "item_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="item_number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate whitespace-nowrap">
            {row.getValue("item_number")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//item_number
  {
    accessorKey: "master_item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="master_item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate whitespace-nowrap">
            {row.getValue("master_item")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//master_item
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="level" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("level")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//level
  {
    accessorKey: "trans",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="trans" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate whitespace-nowrap">
            {row.getValue("trans")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//trans
]

export const columninsertExcel: ColumnDef<Task>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="address" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("address")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//address
  {
    accessorKey: "master_item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="master_item" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("master_item")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//master_item
  {
    accessorKey: "parent_item",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="parent_item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("parent_item")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//parent_item
  {
    accessorKey: "item_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="item_number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate ">
            {row.getValue("item_number")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },//item_number
  {
    accessorKey: "level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="level" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("level")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//level
  {
    accessorKey: "start_effective",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="start_effective" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("start_effective")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//start_effective
  {
    accessorKey: "qty_per",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="qty_per" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("qty_per")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//qty_per
  {
    accessorKey: "sequence_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="sequence_number" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("sequence_number")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//sequence_number
  {
    accessorKey: "boi_scrap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="boi_scrap" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("boi_scrap")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//boi_scrap
  {
    accessorKey: "process",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="process" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("process")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//process
  {
    accessorKey: "forecast",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="forecast" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("forecast")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//forecast
  {
    accessorKey: "lt_ofset",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="lt_ofset" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("lt_ofset")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//lt_ofset
  {
    accessorKey: "usertit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="usertit" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("usertit")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//usertit
  {
    accessorKey: "op",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="op" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("op")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//op
  {
    accessorKey: "scrap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="scrap" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("scrap")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//scrap
  {
    accessorKey: "option_group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="option_group" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("option_group")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//option_group
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="reference" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("reference")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//reference
  {
    accessorKey: "end_effective",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="end_effective" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("end_effective")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//end_effective
  {
    accessorKey: "remarks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="remarks" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("remarks")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//remarks
]

export const columnsendWT: ColumnDef<Task>[] = [
  {
    accessorKey: "id_worktest",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id_worktest" />
    ),
    cell: ({ row }) => <div className="max-w-[200px]">{row.getValue("id_worktest")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//id_worktest
  {
    accessorKey: "item_number",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="item_number" table={table} columnName={'item_number'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("item_number")}
          </span>
        </div>
      )
    },
  },//item_number
  {
    accessorKey: "prod_area",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="prod_area" table={table} columnName={'prod_area'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("prod_area")}
          </span>
        </div>
      )
    },
  },//prod_area
  {
    accessorKey: "prod_unit",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="prod_unit" table={table} columnName={'prod_unit'} />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate ">
            {row.getValue("prod_unit")}
          </span>
        </div>
      )
    },
  },//prod_unit
]

export const columnPackSTD: ColumnDef<Task>[] = [//pack_qty_package
  {
    accessorKey: "id_pack",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id_pack" columnName='id_pack' className="w-[200px]" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("id_pack")}</div>,
    enableSorting: false,
    enableHiding: false,
  },//id_pack
  {
    accessorKey: "inner_box",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="inner_box" table={table} columnName={'inner_box'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("inner_box")}
          </span>
        </div>
      )
    },
  },//inner_box
  {
    accessorKey: "pack_qty_inner",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="pack_qty_inner" table={table} columnName={'pack_qty_inner'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("pack_qty_inner")}
          </span>
        </div>
      )
    },
  },//pack_qty_inner
  {
    accessorKey: "package_carton",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="package_carton" table={table} columnName={'package_carton'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("package_carton")}
          </span>
        </div>
      )
    },
  },//package_carton
  {
    accessorKey: "pack_qty_package",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="pack_qty_package" table={table} columnName={'pack_qty_package'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("pack_qty_package")}
          </span>
        </div>
      )
    },
  },//pack_qty_package
  {
    accessorKey: "master_item_box",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="master_item_box" table={table} columnName={'master_item_box'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("master_item_box")}
          </span>
        </div>
      )
    },
  },//master_item_box
  {
    accessorKey: "lamp_n_w",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="lamp_n_w" table={table} columnName={'lamp_n_w'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("lamp_n_w")}
          </span>
        </div>
      )
    },
  },//lamp_n_w
  {
    accessorKey: "plate_weight",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="plate_weight" table={table} columnName={'plate_weight'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("plate_weight")}
          </span>
        </div>
      )
    },
  },//plate_weight
  {
    accessorKey: "buffer",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="buffer" table={table} columnName={'buffer'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("buffer")}
          </span>
        </div>
      )
    },
  },//buffer
  {
    accessorKey: "buffer_mtl_weight",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="buffer_mtl_weight" table={table} columnName={'buffer_mtl_weight'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("buffer_mtl_weight")}
          </span>
        </div>
      )
    },
  },//buffer_mtl_weight
  {
    accessorKey: "carton_n_w",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="carton_n_w" table={table} columnName={'carton_n_w'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("carton_n_w")}
          </span>
        </div>
      )
    },
  },//carton_n_w
  {
    accessorKey: "g_w",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="g_w" table={table} columnName={'g_w'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("g_w")}
          </span>
        </div>
      )
    },
  },//g_w
  {
    accessorKey: "cubic",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="cubic" table={table} columnName={'cubic'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[130px] truncate ">
            {row.getValue("cubic")}
          </span>
        </div>
      )
    },
  },//cubic
  {
    accessorKey: "docx_pack",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="docx_pack" table={table} columnName={'docx_pack'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("docx_pack") ?
            <Button onClick={() => handleOpenfile(row.getValue("docx_pack"), 'docx_pack')} className="max-w-[500px] truncate h-9" style={{ background: '#3b82f6' }}>
              <FileSearch />
            </Button> : null}
        </div>
      )
    },
  },//docx_pack
  {
    accessorKey: "docx_wi",
    header: ({ column, table }) => (
      <DataTableColumnHeaderFilter column={column} title="docx_wi" table={table} columnName={'docx_wi'} className='w-[130px]' />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("docx_wi") ?
            <Button onClick={() => handleOpenfile(row.getValue("docx_wi"), 'docx_wi')} className="max-w-[500px] truncate h-9" style={{ background: '#3b82f6' }}>
              <FileSearch />
            </Button> : null}
        </div>
      )
    },
  },//docx_wi 
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      )
    },
  },//actions
]

export const columnsPack_STD = () => {
  return columnPackSTD
}





import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"