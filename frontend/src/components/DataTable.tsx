
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    // const dataAwaited = use(data);
    const table = useReactTable({
        // dataAwaited,
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table className={"rounded-xl"}>
                <TableHeader className={"rounded-xl"}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className={"rounded-xl"}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className={"rounded-xl"}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className={"rounded-xl"}>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow className={"rounded-xl"}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={"rounded-xl"}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
