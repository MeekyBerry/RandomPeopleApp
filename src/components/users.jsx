/*==========================================
Set up client-side pagination using randomuser.me API in one of your routes called Users - you should show the prev, next, and navigation to individual pages 1, 2, 3, 4, 5 etc. Implement accessibility and disabled state and API loading states. ============================================ */

import { useEffect, useState } from "react";

const Users = () => {  // 1. Create a component called Users
  const [users, setUsers] = useState([]);  // 2. Create a state variable called users and set it to an empty array
  const [page, setPage] = useState(1);   // 3. Create a state variable called page and set it to 1
  const [loading, setLoading] = useState(false);  // 4. Create a state variable called loading and set it to false
  const [error, setError] = useState(null);   // 5. Create a state variable called error and set it to null

  useEffect(() => {   // 6. Create a useEffect hook that will fetch the users from the API
    setLoading(true);    // 7. Set the loading state variable to true before the API call is made  
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)   // 8. Fetch the users from the API using the page state variable to determine the page number to fetch from the API  
      .then((response) => response.json())  // 9. Convert the response to JSON 
      .then((data) => {    // 10. Use the data from the API call to set the users state variable to the results from the API call  
        setUsers(data.results);  // 10. Set the users state variable to the data returned from the API call 
        setLoading(false);   // 11. Set the loading state variable to false after the API call is made  
      })
      .catch((err) => {
        setError(err);    // 12. Set the error state variable to the error returned from the API call 
        setLoading(false);  // 13. Set the loading state variable to false after the API call is made 
      });
  }, [page]);  // 14. Add the page state variable to the dependency array so that the useEffect hook will run when the page state variable changes 

  if (loading) return <div>Loading...</div>;  // 15. If the loading state variable is true, return the text Loading...  
  if (error) return <div>{error.message}</div>; // 16. If the error state variable is true, return the error message returned from the API call 

  return (  // 17. Return the users state variable to the UI
    <div>
      <h1>Users</h1>
      <button
        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={page === 1}>Prev</button>  {/* 18. Create a button that will decrease the page state variable by 1 when clicked and disable the button if the page state variable is 1 */}
      <span>{page}</span>  {/* 19. Display the page state variable */}
      <button
        onClick={() => setPage((prevPage) => (!users.length ? prevPage : prevPage + 1))}
        disabled={!users.length}>Next</button> {/* 20. Create a button that will increase the page state variable by 1 when clicked and disable the button if the users state variable is empty*/}
      <ul>  {/* 21. Create a list of users returned from the API call */}
        {users.map((user) => {   // 22. Map over the users state variable and return the user's name, email, and phone number to the UI 
          const { name, gender, nat, location, login, email, dob, phone, picture } = user; // 23. Destructure the user object to get the login, name, and picture properties  
          return (
            <li key={login.uuid}>  {/* 24. Create a list item for each user returned from the API call */}
              <img src={picture.large} alt={name.first} /> {/* 25. Display the user's picture */}
              <p><strong>Name:</strong> {name.title}, {name.first} {name.last}</p> {/* 26. Display the user's first and last name */}
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>Username:</strong> {login.username}</p> {/* 27. Display the user's username and password */}
              <p><strong>Age</strong> {dob.age}</p>
              <p><strong>Email:</strong> {email}</p>  {/* 28. Display the user's email and phone number */}
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Nationality:</strong> {nat}</p>
              <p><strong>Location:</strong> {location.city}, {location.state}, {location.country}, {location.postcode}</p>
              <p><strong>Time-zone:</strong> {location.timezone.offset}, {location.timezone.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;  // 29. Export the Users component