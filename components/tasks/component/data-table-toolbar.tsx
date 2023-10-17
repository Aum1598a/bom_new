"use client"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table, flexRender } from "@tanstack/react-table"
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { DataTableViewOptions, DataTableViewOptionsbom } from "./data-table-view-options"
import { status_item, unit, prod_line, data_test, level } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { ChangeEvent, useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  dataCount?: any
  handleFilter?: any
  setTextSearch?: any
  handleonClick?: any
}




interface DataTableToolbarPropsinput<TData> {
  table: Table<TData>
  setTextSearch?: any
  handleonClick?: any
  statusItem?: any

}
//includes
export function DataTableToolbar<TData>({
  table, handleFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Item..."
          onChange={(event) => handleFilter ? handleFilter(event.target.value) : null}
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("um") && (
          <DataTableFacetedFilter
            column={table.getColumn("um")}
            title="um"
            options={unit}

          />
        )}
        {table.getColumn("prod_line") && (
          <DataTableFacetedFilter
            column={table.getColumn("prod_line")}
            title="prod_line"
            options={prod_line}
          />
        )} */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

export function DataTableToolbarDocx<TData>({
  table, handleonClick
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Item Docx..."
          onChange={(event) =>
            handleonClick(event.target.value)
            // table.getColumn("item_number")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status_test") && (
          <DataTableFacetedFilter
            column={table.getColumn("status_test")}
            title="status_test"
            options={data_test}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

export function DataTableToolbarDocxECO<TData>({
  table, handleonClick
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Item Docx..."
          onChange={(event) =>
            handleonClick(event.target.value)
            // table.getColumn("id_eco")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

export function DataTableToolbarBom<TData>({
  table, setTextSearch, handleonClick, statusItem
}: DataTableToolbarPropsinput<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className='flex '>
          <Input
            placeholder="Filter Item..."
            onChange={(event) => setTextSearch(event.target.value)}
            className="h-10 w-[150px] lg:w-[250px]"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleonClick()
              }
            }}
          />
          <Button onClick={handleonClick} className="" style={{ background: '#3b82f6' }}>ค้นหา</Button>
        </div>

        {/* {table.getColumn("level") && (
          <DataTableFacetedFilter
            column={table.getColumn("level")}
            title="level"
            options={level}
            statusItem={level}
          />
        )}
        {table.getColumn("status_item") && (
          <DataTableFacetedFilter
            column={table.getColumn("status_item")}
            title="status_item"
            options={status_item}
            statusItem={statusItem}
          />
        )} */}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

export function DataTableToolbarRevis<TData>({
  table, setTextSearch, handleonClick
}: DataTableToolbarPropsinput<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className='flex '>
          <Input
            placeholder="Filter Item..."
            onChange={(event) => setTextSearch(event.target.value)}
            className="h-10 w-[150px] lg:w-[250px]"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleonClick()
              }
            }}
          />
          <Button onClick={handleonClick} className="" style={{ background: '#3b82f6' }}>ค้นหา</Button>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}


export function DataTableToolbarSend_docx<TData>({
  table,handleFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Item Work ID..."
          onChange={(event) =>handleFilter(event.target.value)
            // table.getColumn("id_worktest")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}