import React from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

export default function Sidebar() {
    return (
        <aside className="col-sm-12 col-lg-4">
            <Card>
                <CardBody>
                    <CardText>
                        Sidebar
                    </CardText>
                </CardBody>
            </Card>
        </aside>
    )
}