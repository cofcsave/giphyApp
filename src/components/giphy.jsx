import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from './loading'
import Paginate from './pagination'
/* 
React fetch API
[] at the end to stop the looping
look through object to find the array dot notation I need
key added because "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:"
*/
const Giphy = () => {
    const [data, setData] = useState([]); /* This is the giphy data state so updates without refresh when state is changed*/
    const [isLoading, setIsLoading] = useState(false);/* This is the loading graphic state to be used before the gifs load. Default is false because it's not always loading*/
    const [search, setSearch] = useState();
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem-itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(()=> {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);/*setting loader to true before fetching data so that it showes up. Function below checkes to see if it's true before rendering gif */

            try {
                /* like an if else statement. Run and if errors move to the catch phase*/
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "1ONWzg8RCSAFiXrPNn1BOn8iZ3sVLZB5",
                        limit: 100
                    }
                });
                console.log(results);
                setData(results.data.data);
            } catch (err) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000)
            }
            
           
            setIsLoading(false);/* after done set to false so it disapears*/
        };
        fetchData()
    }, []);
    const renderGifs = () => {
        if (isLoading) {
            return <Loader/> /*show the loader if it's true which it is in the fetchdata function */
        }
        return currentItems.map(el => {
            return (
                <div key="el.id" className="gif"><img src={el.images.fixed_height.url}></img></div>
            )
        })
    }
    const renderError = () => {
        if (isError) {
            return <div role="alert">There was an error</div>
        }
    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);
        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "1ONWzg8RCSAFiXrPNn1BOn8iZ3sVLZB5",
                    q: search,
                    limit: 100
                }
            });
            setData(results.data.data);
        } catch(err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000)
        }
        
        
        setIsLoading(false);
    };

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="m-2">
            {renderError()}
            <h1>Cassy's Giphy App</h1>
            <form className="searchForm">
                <input onChange={handleSearchChange} value={search} type="text" placeholder="Search" className="searchBar"/>
                <button onClick={handleSubmit} className="btn" type="submit">Search</button>
            </form>
            <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length} pageSelected={pageSelected}/>
            <div className="container gifs">{renderGifs()}</div>
        </div>
    )
}

export default Giphy