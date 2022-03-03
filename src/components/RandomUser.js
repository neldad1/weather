import React, { useState, useEffect } from 'react';

const url = 'https://randomuser.me/api/';

function RandomUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        setUser(result.results[0]);
        console.log(user);
      });
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="App">
      <h1>
        {user.name.title} {user.name.first} {user.name.last}
      </h1>
    </div>
  );
}

export default RandomUser;
