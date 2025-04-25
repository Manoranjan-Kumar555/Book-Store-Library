import React, { useEffect, useState } from 'react'
import GolbalLoader from '../components/GlobalLoader/GolbalLoader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios';


const Allbooks = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        console.log("Response:", response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchRecentBooks();
  }, []);
  return (
    <div className='bg-zinc-900 px-4'>
      <h4 className="text-3xl text-yellow-100">All Books!</h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <GolbalLoader />
        </div>
      )}
      <div className="mx-4 mt-4 pb-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10">
        {data && data.length > 0 ? (
          data.map((items, i) => (
            <div key={items.id || i}>
              <BookCard book={items} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No books found.</p>
        )}
      </div>
    </div>
  )
}

export default Allbooks
