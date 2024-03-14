import { Button } from 'react-bootstrap';

const buttons = [
    {
        color: "success",
        label: "Directors",
        link: "/director"
    },
    {
        color: "info",
        label: "Producers",
        link: "/producer"
    },
    {
        color: "danger",
        label: "Stars",
        link: "/star"
    },
    {
        color: "secondary",
        label: "Genres",
        link: "/genre"
    },
    {
        color: "warning",
        label: "Movies",
        link: "/movie"
    }
]

const Header = ({ children }) => {
    return (
        <>
            <header className='mb-4'>
                <h1 className='text-center mt-1 mb-2 '>Dashboard</h1>
                <div className='d-flex align-content-center justify-content-center gap-3'>
                    { buttons.map(btn => (
                        <Button key={ btn.link } variant={ btn.color } href={ btn.link }>{ btn.label }</Button>
                    )) }
                </div>
            </header>

            { children }
        </>
    )
}

export default Header