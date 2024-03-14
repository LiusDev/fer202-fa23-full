import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SideBar = ({ producers }) => {
    return (
        <Col sm={ 2 }>
            <h3>
                Producers
            </h3>
            <ul>
                { !producers ? <li>...Loading</li> :
                    producers.map(p => (
                        <li key={ p.id }>
                            <Link to={ `/movie?producer=${p.id}` }>{ p.Name }</Link>
                        </li>
                    ))
                }
            </ul>
        </Col>
    )
}

export default SideBar