import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faLaptop, faFlask, faBriefcase, faFilm, faHeartbeat, faFutbol } from '@fortawesome/free-solid-svg-icons';

const categoryIcons = {
    General: faNewspaper,
    Technology: faLaptop,
    Science: faFlask,
    Business: faBriefcase,
    Entertainment: faFilm,
    Health: faHeartbeat,
    Sports: faFutbol,
};

const CategoryCard = ({ category, onSelect }) => {
    return (
        <div className="category-card text-center" onClick={() => onSelect(category)}>
            <div className="card-body">
                <FontAwesomeIcon icon={categoryIcons[category]} size="2x" />
                <h5 className="card-title mt-2">{category}</h5>
            </div>
        </div>
    );
}

export default CategoryCard;
