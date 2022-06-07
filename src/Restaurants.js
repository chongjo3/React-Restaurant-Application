import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Pagination, Table } from 'react-bootstrap';

function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        let borough = urlParams.get("borough");
        let url;
        if (borough === undefined || borough == null) {
            url = `https://immense-sea-64619.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
        }
        else {
            url = `https://immense-sea-64619.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`
        }
        fetch(url).then((res) => {
            return res.json();
        }).then((parsedJson) => {
            setRestaurants(parsedJson);
        })
    }, [location, page]);

    function previousPage() {
        if (page > 1) {
            setPage(previousPage => previousPage - 1);
        }
    }

    function nextPage() {
        setPage(previousPage => previousPage + 1);

    }
    if (restaurants != null) {
        if (restaurants.length > 0) {
            return (
                <>
                    <Card bg="light"
                            text="dark" className="mt-4">
                        <Card.Body>
                            <Card.Title>Restaurant List</Card.Title>
                            <Card.Text>
                                Full list of restaurants. Optionally sorted by borough
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Table striped bordered hover className="mt-2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Borough</th>
                                <th>Cuisine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                restaurants.map(restaurant => (
                                    <tr key={restaurant._id} onClick={() => { navigate(`/restaurant/${restaurant._id}`) }}>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.address.building} {restaurant.address.street}</td>
                                        <td>{restaurant.borough}</td>
                                        <td>{restaurant.cuisine}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{page}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </>
            )
        }

    }
    if (restaurants != null) {
        if (restaurants.length === 0) {
            return (
                <Card bg="light"
                text="dark" className="mt-4">
                    <Card.Body>
                        <Card.Text>
                            Loading Restaurants...
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }

    return (
        <Card bg="light"
        text="dark" className="mt-4">
            <Card.Body>
                <Card.Text>
                    No Restaurants Found
                </Card.Text>
            </Card.Body>
        </Card>
    );

}
export default Restaurants;