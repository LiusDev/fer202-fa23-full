import { Form, Row, Col, Table } from 'react-bootstrap';
import Header from '../components/common/Header'
import { useEffect, useState } from 'react';
import { instance } from '../ultils';
import { Link, useSearchParams } from 'react-router-dom';
import SideBar from '../components/common/SideBar';

const Movie = () => {
    const [producers, setProducers] = useState(null)
    const [movies, setMovies] = useState(null)
    const [filteredMovies, setFilterdMovies] = useState(null)
    const [filteredMoviesByName, setFilterdMoviesByName] = useState(null)
    const [directors, setDirectors] = useState(null)
    const [movieStars, setMovieStars] = useState(null)
    const [stars, setStars] = useState(null)
    const [params] = useSearchParams()
    const [search, setSearch] = useState("")

    const filterMoviesByProducer = (id, movies) => {
        if (!id) { id = producers[0]?.id }
        setFilterdMovies(movies?.filter(m => m.ProducerId === id))
    }

    const filterMoviesByName = (value, filteredMovies) => {
        if (value.trim() === "") {
            setFilterdMoviesByName(filteredMovies)
        }
        setFilterdMoviesByName(filteredMovies?.filter(m => m.Title.includes(value)))
    }

    useEffect(() => {
        if (movies) {
            filterMoviesByProducer(parseInt(params.get("producer")), movies)
        }
    }, [params, movies])

    const handleFetch = async () => {
        try {
            const res1 = await instance.get("/producers")
            setProducers(res1.data)
            const res2 = await instance.get("/movies")
            setMovies(res2.data)
            filterMoviesByProducer(res1.data[0].id, res2.data)
            const res3 = await instance.get("/directors")
            setDirectors(res3.data)
            const res4 = await instance.get("/movie_star")
            setMovieStars(res4.data)
            const res5 = await instance.get("/stars")
            setStars(res5.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (filteredMovies) {
            filterMoviesByName(search, filteredMovies)
        }
    }, [filteredMovies, search])

    const getDirectorName = (id) => {
        return directors?.find(d => d.id === id)?.FullName
    }

    const getStarsNameByMovieId = (id) => {
        const starIds = movieStars?.filter(m => m.MovieId === id)?.map(movie => movie.StarId)
        return stars?.filter(s => starIds.includes(s.id))?.map(star => star.FullName).join(", ")
    }

    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <Header>
            <h2 className='text-center'>Movie Management</h2>
            <div className='d-flex align-items-center justify-content-center mb-4'>
                <Form.Control placeholder='Search...' className='w-25' value={ search } onChange={ (e) => setSearch(e.target.value) } />
            </div>
            <Row className='p-4 '>
                <SideBar producers={ producers } />
                <Col sm={ 10 }>
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>ReleaseDate</th>
                                <th>Description</th>
                                <th>Language</th>
                                <th>Directors</th>
                                <th>Stars</th>
                            </tr>
                        </thead>
                        <tbody>
                            { !filteredMoviesByName ? <tr>
                                <td colSpan={ 7 }>...Loading</td>
                            </tr> :
                                filteredMoviesByName.map(m => (
                                    <tr key={ m.id }>
                                        <td>{ m.id }</td>
                                        <td>{ m.Title }</td>
                                        <td>{ m.ReleaseDate }</td>
                                        <td>{ m.Description }</td>
                                        <td>{ m.Language }</td>
                                        <td>{ getDirectorName(m.DirectorId) }</td>
                                        <td>{ getStarsNameByMovieId(m.id) }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Header>
    )
}

export default Movie