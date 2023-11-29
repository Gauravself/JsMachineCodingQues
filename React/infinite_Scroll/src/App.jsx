import { useCallback, useRef, useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/InfiniteScroll";

function App() {
  const [query, setQuery] = useState("");
  const controllerRef = useRef(null);

  const handleInput = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const renderItem = useCallback(
    ({ title }, key, ref) => (
      <div ref={ref} key={key}>
        {title}
      </div>
    ),
    []
  );

  const getData = useCallback((query, page) => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    let promise = fetch(
      "https://openlibrary.org/search.json?" +
        new URLSearchParams({
          q: query,
          page,
        }),
      { signal: controllerRef.current.signal }
    );
    return promise;
  }, []);

  return (
    <>
      <input type="text" value={query} onChange={handleInput} />
      <InfiniteScroll
        renderListItem={renderItem}
        getData={getData}
        query={query}
      />
    </>
  );
}

export default App;
