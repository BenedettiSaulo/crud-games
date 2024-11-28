import { useState } from 'react';
import { Accordion, Container, Spinner, Table } from 'react-bootstrap';
import { getLogs } from '../services/GameService';
import { Log } from '../types/Log';

export function AccordionLogs() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleAccordionToggle = async (isOpen: boolean) => {
        console.log(isOpen);

        if (isOpen && logs.length === 0) {
            setLoading(true);

            try {
                const logs = await getLogs();

                setLogs(logs.sort(sortByDate).slice(0, 20));
            } catch (error) {
                console.error('Error fetching logs:', error);
            }

            setLoading(false);
        }
    };

    return (
        <Container fluid className="container-logs">
            <Accordion defaultActiveKey="1" onSelect={(eventKey) => handleAccordionToggle(eventKey === '0')}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header >Logs</Accordion.Header>
                    <Accordion.Body>
                        {loading ? (
                            <Spinner animation='border' />
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>registrationNumbers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(log => (
                                        <tr key={log.idlog}>
                                            <td>{log.idlog}</td>
                                            <td>{log.datahora.toString()}</td>
                                            <td>{log.numeroregistros}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

function sortByDate(a: Log, b: Log): number {
    const aDate = new Date(a.datahora);
    const bDate = new Date(b.datahora);

    return bDate.getTime() - aDate.getTime();
}