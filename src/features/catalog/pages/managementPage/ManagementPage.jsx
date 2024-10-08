import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './ManagementPage.css';
import useLoged from "../../hooks/useLoged";

function ManagementPage() {
    const navigate = useNavigate();
    const { loged } = useLoged();

    useEffect(() => {
        if (!loged) {
            navigate('/login');
        }
    }, [navigate, loged]);

    const managmentOptions = [
        { title: 'Administrar Libros', path: '/manage/books' },
        { title: 'Administrar Collecciones/Generos', path: '/manage/co_ge' },
        { title: 'Libros sin generos', path: '/manage/books-no-genre' },
        // {title: 'Agregar proximas visitas', path: '/manage/add-visits'},
        { title: 'Administrar Patrons', path: '/manage/patrons' },
        { title: 'Estadisticas', path: '/stats' }
    ]

    return (
        { loged } ? (
            <h1>Redirecting...</h1>
        ) : (
            <div className="admin-container">
                <h1 className="admin-header">Administrar</h1 >
                <div className="manage-options">
                    {managmentOptions.map((option, index) => (
                        <div className='manage-option' key={index}>
                            <button onClick={() => navigate(option.path)}>{option.title}</button>
                        </div>
                    ))}
                </div>
            </div >
        )
    );
};

export default ManagementPage;