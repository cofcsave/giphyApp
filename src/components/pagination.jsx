import React from "react";

const Paginate = (props) => {
    const pageNumber = [];
    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => {
                    let classes = "page-item ";
                    if (number === props.currentPage) {
                        classes += "active";
                    }
                    return (
                    <li className={classes}>
                        <a onClick={() => props.pageSelected(number)} href="!#" className="page-link">{number}</a>
                    </li>
                    );
                })}
            </ul>
        </nav>
    );
}
/*
Math.ceil to round up to next page if the number is not exactly divided by 25
this gets the 25 per page
*/
export default Paginate