import { useQuery, gql } from "@apollo/client";

type Location = {
  id: string;
  name: string;
  description: string;
  photo: string;
};

const DisplayLocations = () => {
  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;
  const { loading, error, data } = useQuery<{ locations: Location[] }>(
    GET_LOCATIONS
  );

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("gql query", data);

  return (
    <>
      {data?.locations.map((el) => (
        <div key={el.id}>
          <h3>{el.name}</h3>
          <img
            width="400"
            height="250"
            alt="location-reference"
            src={`${el.photo}`}
          />
          <br />
          <b>About this location:</b>
          <p>{el.description}</p>
          <br />
        </div>
      ))}
    </>
  );
};

export default DisplayLocations;
