

const Just = () => {
  const name = "Just Component";
  const id = 12345;
  const info = {
    description: "This is a simple React component.",
    version: "1.0.0"
  };

  return (
    <div>
      <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Neque accusantium consectetur reprehenderit. 
        Sunt eum reiciendis vel maiores repudiandae in hic, placeat ipsam iste earum obcaecati repellat corrupti suscipit veritatis eveniet?
        </h1>

      <p>Try to learn Redux Toolkit step by step. And practice it regularly because practice is the key to 
        success in learning any new technology.
      </p>
      <p>Name: {name}</p>
      <p>ID: {id}</p>
      <p>Description: {info.description}</p>
      <p>Version: {info.version}</p>
      <div>
        <h2>Features of Redux Toolkit:</h2>
        <ul>
          <li>Simplified Redux Development</li>
        </ul>
      </div>
    </div>
  )
}

export default Just