
import React from 'react'
import { Card } from 'react-bootstrap';

export default function About() {
    return (
        <Card bg="light"
        text="dark" className="mt-4">
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    My name is <b>Joshua Chong</b>. 
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
