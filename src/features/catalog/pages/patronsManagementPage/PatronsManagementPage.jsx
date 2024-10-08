import { useState, useEffect, useMemo } from "react";
import usePatrons from "@hooks/usePatrons";
import Pagination from "@components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { deletePatron } from "./functs/patronFuncts";
import SearchBar from "@components/searchBar/SearchBar";
import "./PatronsManagementPage.css";
import ConfirmDelete from "@components/confirmDelete/ConfirmDelete";

const PatronsManagementPage = () => {
    const navigate = useNavigate();
    const { patrons, loading } = usePatrons();
    const [patronList, setPatronList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const patronsPerPage = 20;

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [patronToDelete, setPatronToDelete] = useState(null);

    useEffect(() => {
        if (patrons) {
            setPatronList(patrons);
        }
    }, [patrons]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredPatrons = useMemo(() => {
        if (!searchTerm) {
            return patronList;
        }
        return patronList.filter(patron =>
            patron.first_name && patron.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patron.last_name && patron.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patron.patron_id && patron.patron_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patronList, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const currentPatrons = useMemo(() => {
        const indexOfLastPatron = currentPage * patronsPerPage;
        const indexOfFirstPatron = indexOfLastPatron - patronsPerPage;
        return filteredPatrons.slice(indexOfFirstPatron, indexOfLastPatron);
    }, [currentPage, filteredPatrons]);

    const handleDelete = async (id) => {
        const status = await deletePatron(id);

        if (status) {
            console.log('patron deleted');
        }
        else {
            console.error('error deleting patron');
        }
        setPatronList(patronList.filter(patron => patron.id !== id));
    };

    const handleShowDeleteModal = (id) => {
        setPatronToDelete(id);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (patronToDelete) {
            const status = await deletePatron(patronToDelete);
            if (status) {
                console.log('Patron deleted');
                setPatronList(patronList.filter(patron => patron.id !== patronToDelete));
            } else {
                console.error('Error deleting patron');
            }
        }
        setShowConfirmDelete(false);
        setPatronToDelete(null);
    };

    return (
        <div>
            <h1>Patrons Management Page</h1>
            <SearchBar onSearch={handleSearch} message="Buscar patron por patron_id, nombre o apellido"/>
            <Pagination
                currentPage={currentPage}
                totalCount={filteredPatrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
            <div>
                <button
                    onClick={() => { navigate("/create_patron") }}
                    className="add-patron-button"
                >
                    Agregar Patron
                </button>
            </div>
            <div>
                <table className="patrons-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address 1</th>
                            <th>Address 2</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th>Patron Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="11">Loading...</td>
                            </tr>
                        ) : currentPatrons?.map(patron => (
                            <tr key={patron.id}>
                                <td>{patron.first_name ? patron.first_name : <span className="thick-line"></span>}</td>
                                <td>{patron.last_name ? patron.last_name : <span className="thick-line"></span>}</td>
                                <td>{patron.email ? patron.email : <span className="thick-line"></span>}</td>
                                <td>{patron.phone ? patron.phone : <span className="thick-line"></span>}</td>
                                <td>{patron.address1 ? patron.address1 : <span className="thick-line"></span>}</td>
                                <td>{patron.address2 ? patron.address2 : <span className="thick-line"></span>}</td>
                                <td>{patron.city ? patron.city : <span className="thick-line"></span>}</td>
                                <td>{patron.state ? patron.state : <span className="thick-line"></span>}</td>
                                <td>{patron.country ? patron.country : <span className="thick-line"></span>}</td>
                                <td>{patron.zip ? patron.zip : <span className="thick-line"></span>}</td>
                                <td>{patron.patron_id ? patron.patron_id : <span className="thick-line"></span>}</td>
                                <td>
                                    <button
                                        onClick={() => { navigate(`/edit/patron/${patron.id}`) }}
                                        className="edit-patron-button"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleShowDeleteModal(patron.id)}
                                        className="delete-patron-button"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={filteredPatrons.length}
                pageSize={patronsPerPage}
                onPageChange={handlePageChange}
            />
            <ConfirmDelete
                show={showConfirmDelete}
                handleClose={() => setShowConfirmDelete(false)}
                handleConfirm={confirmDelete}
                message="¿Estás seguro de que quieres eliminar este patron?"
            />
        </div>
    );
};

export default PatronsManagementPage;