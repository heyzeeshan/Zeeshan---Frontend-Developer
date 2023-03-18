import React, { useEffect, useState } from 'react';

const Rocket = () => {
  const [rockets, setRockets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // For Search Form
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterRockets = (rocket) => {
    const nameMatch = rocket.name.toLowerCase().includes(searchQuery.toLowerCase());
    const costMatch = rocket.cost_per_launch.toString().includes(searchQuery);
    const firstFlightMatch = rocket.first_flight.includes(searchQuery.toLowerCase());
    
    return nameMatch || costMatch || firstFlightMatch;
  };

  const filteredRockets = rockets.filter(filterRockets);

  // For Pagination 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = () => {
    const totalPages = Math.ceil(filteredRockets.length / itemsPerPage);

    return (
      <div className="flex justify-center my-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'
            } font-bold py-2 px-4 mx-1 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  // Fetch API from SpaceX
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.spacexdata.com/v4/rockets');
      const data = await response.json();
      setRockets(data);
    };

    fetchData();
  }, []);

  // Landing Page Design 1. Banner, 2. Search form, 3. Data Grid
  return (
    <div className="bg-gray-100">
      <div className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold" id="rockets">
            Our Rockets
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <form>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="search"
                  >
                    Search by Rocket Name, Cost, First Flight
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder="Enter rocket name"
                    onChange={handleSearchQuery}
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="w-full md:w-2/3 px-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Rocket Data</h2>
              <div className="flex flex-col">
                {filteredRockets.length === 0 && (
                  <p className="text-gray-600">No rockets found.</p>
                )}
                {filteredRockets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((rocket) => (
                  <div key={rocket.id} className="bg-white light:bg-gray-800 my-2 p-4 rounded-md shadow">
                    <div className="text-xl font-bold">{rocket.name}</div>
                    <hr/>
                    <br/>
                    <img src={rocket.flickr_images[0]} alt="Rocket" className="h-48 object-cover rounded-md" />
                    <br/>
                    <table className="table-auto w-full">
                      <tbody>
                        <tr>
                          <td className="font-bold pr-2">Description:</td>
                          <td className="text-left">{rocket.description}</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2">Height:</td>
                          <td>{rocket.height.meters} m</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2">Diameter:</td>
                          <td>{rocket.diameter.meters} m</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2">Mass:</td>
                          <td>{rocket.mass.kg} kg</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2">Cost/launch:</td>
                          <td>${rocket.cost_per_launch}</td>
                        </tr>
                        <tr>
                          <td className="font-bold pr-2">First Flight:</td>
                          <td>{rocket.first_flight}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rocket;
