import { Modal } from 'react-bootstrap';


const Modals = ({
    show,
    hideModals,
    modalContent
}) => {
    return (
        <Modal show={ show } onHide={ hideModals }>
            <Modal.Header closeButton>
                <Modal.Title>{ modalContent.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ modalContent.children }</Modal.Body>
            { modalContent.footer &&
                (<Modal.Footer>
                    { modalContent.footer }
                </Modal.Footer>)
            }
        </Modal>
    )
}

export default Modals