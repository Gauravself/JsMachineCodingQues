import { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = ({ renderListItem, getData, query }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);

  let page = useRef(1);
  let observer = useRef(null);

  let lastElementObserver = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        page.current += 1;
        getList();
      }
    });
    if (node) observer.current.observe(node);
  });

  const getList = useCallback(async () => {
    try {
      setLoading(true);
      let response = await getData(query, page.current);
      let data = await response.json();
      setList((prevData) => [...prevData, ...data.docs]);
      console.log(data.docs);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [query]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <div>
      {error && <div>Something went wrong...</div>}
      {list.map((item, index) =>
        index === item.length - 1
          ? renderListItem(item, index, lastElementObserver)
          : renderListItem(item, index, null)
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
