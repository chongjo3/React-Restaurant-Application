import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams} from 'react-router-dom';
import { Card, CardDeck } from 'react-bootstrap';
import dateFormat from "dateformat";

export default function Restaurant() {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        let url = `https://immense-sea-64619.herokuapp.com/api/restaurants/${id}`;
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            setLoading(false);
            if (data.hasOwnProperty("_id")) {
                setRestaurant(data);
            } else {
                setRestaurant(null);
            }
        })
    }, [id]);
    if (loading === false) {
        if (restaurant != null) {
            return (
                <>
                    <Card bg="light"
                        text="dark" className="mt-4">
                        <Card.Body>
                            <Card.Title>{restaurant.name}</Card.Title>
                            <Card.Text>
                                {restaurant.address.building} {restaurant.address.street}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <MapContainer className="mt-4" style={{ "height": "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13}
                        scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                    </MapContainer>
                    <br></br>
                    <h4>Rating</h4>
                    <hr />

                    <CardDeck>
                        {restaurant.grades.map(currentGrade => (
                            <Card
                                key={currentGrade._id}
                                bg="light"
                                text="dark"
                                style={{ width: '18rem' }}
                                className="mb-2">
                                <Card.Header>Grade: {currentGrade.grade}</Card.Header>
                                <Card.Body>

                                    <Card.Text>
                                        Completed: {dateFormat(currentGrade.date, 'm/d/yyyy')}
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        ))}
                    </CardDeck>
                </>
            )
        }
        else {
            return (
                <Card 
                    bg="light"
                    text="dark"
                    className="mt-4">
                    <Card.Body>
                        <Card.Text>
                            Cannot find Restaurant with id: {id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }
    } else {
        return (
            <Card 
                bg="light"
                text="dark"
                className="mt-4">
                <Card.Body>
                    <Card.Text>
                        Loading Restaurant Data...
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }




}