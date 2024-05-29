import LogsViewerProps from "@/types/LogsViewerProps";
import { Table } from "flowbite-react";

export default function LogsViewer(props: LogsViewerProps) {
    const { logs } = props;

    return (
        <div className="max-h-[85vh] overflow-x-auto">
            <Table striped className="text-xs">
                <Table.Head>
                    <Table.HeadCell>Hora y fecha</Table.HeadCell>
                    {/*<Table.HeadCell>Nivel</Table.HeadCell>*/}
                    {/*<Table.HeadCell>Tipo</Table.HeadCell>*/}
                    <Table.HeadCell>Mensaje</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {logs.map((log, key) => (
                        <Table.Row
                            key={key}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {log.datetime}
                            </Table.Cell>
                            {/*<Table.Cell>{log.level}</Table.Cell>*/}
                            {/*<Table.Cell>{log.type}</Table.Cell>*/}
                            <Table.Cell>{log.message}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
