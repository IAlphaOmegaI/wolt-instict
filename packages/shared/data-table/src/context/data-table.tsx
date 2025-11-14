"use client";

import type { Table } from "@tanstack/react-table";
import {
  type Context,
  createContext,
  type JSX,
  type PropsWithChildren,
  use,
} from "react";
import {
  type UseDataTableConfigParams,
  useDataTableConfig,
} from "../hooks/use-interfaced-table";
import type { Pagination } from "../utils/types/pagination";
import type { TableRow } from "../utils/types/row";

type DataTableContext<R extends TableRow> = {
  table: Table<R>;
  pagination: Pagination;
};
// biome-ignore lint/suspicious/noExplicitAny: we do an assertion later
const DataTableContext: Context<DataTableContext<any> | undefined> =
  // biome-ignore lint/suspicious/noExplicitAny: we do an assertion later
  createContext<DataTableContext<any> | undefined>(undefined);

export const DataTableProvider = <R extends TableRow>({
  children,
  ...props
}: DataTableProvider.Props<R>): JSX.Element => {
  const value = useDataTableConfig<R>(props);

  // value.pagination.pageCount

  const Context: Context<DataTableContext<R> | undefined> = DataTableContext;

  return <Context value={value}>{children}</Context>;
};
export namespace DataTableProvider {
  export type Props<R extends TableRow> = PropsWithChildren<
    UseDataTableConfigParams<R>
  >;
}

export const useDataTable = <R extends TableRow>(): DataTableContext<R> => {
  const context: DataTableContext<R> | undefined = use(DataTableContext);

  if (context === undefined) {
    throw new Error(
      "zenncore: DataTableContext is missing. DataTable components must be placed within a DataTableProvider.",
    );
  }

  return context;
};
