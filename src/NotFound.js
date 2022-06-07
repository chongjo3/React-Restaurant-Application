
import React from 'react'
import { Card } from 'react-bootstrap';

export default function NotFound() {
    return (
        <Card bg="light"
        text="dark" className="mt-4">
            <Card.Body>
                <Card.Title>Not Found</Card.Title>
                <Card.Text>
                    The page you are looking for is unavailable. 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
