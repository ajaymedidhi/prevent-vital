import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Spec {
    label: string;
    value: string;
}

interface SpecsTableProps {
    specs: Spec[];
}

const SpecsTable: React.FC<SpecsTableProps> = ({ specs }) => {
    if (!specs || specs.length === 0) return null;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Specification</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {specs.map((spec, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{spec.label}</TableCell>
                            <TableCell>{spec.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SpecsTable;
