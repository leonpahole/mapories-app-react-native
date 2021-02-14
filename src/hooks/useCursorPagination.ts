import {useEffect, useState} from 'react';
import {CursorPaginatedResponse} from '../model/PaginatedResponse';

// [data, error, loading, refreshing, fetchNext, doRefresh]
export function useCursorPagination<T>(
  getDataFun: (
    cursor?: number,
    params?: any,
  ) => Promise<CursorPaginatedResponse<T>>,
  params?: any,
): [T[], boolean, boolean, boolean, () => void, () => void] {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [data, setData] = useState<T[]>([]);
  const [paginationCursor, setPaginationCursor] = useState<
    number | undefined | null
  >(undefined);

  async function fetchData(doRefresh = false) {
    setLoading(true);
    setError(false);

    try {
      let currentPaginationCursor = paginationCursor;
      if (doRefresh) {
        currentPaginationCursor = undefined;
      }

      if (currentPaginationCursor === null) {
        setRefreshing(false);
        setLoading(false);
        return;
      }

      const dataF = await getDataFun(currentPaginationCursor, params);

      if (doRefresh) {
        setData([...dataF.data]);
      } else {
        setData([...data, ...dataF.data]);
      }

      setPaginationCursor(dataF.cursor);
    } catch (e) {
      console.log('Fetch paginated data error');
      console.log(e);
      setError(true);
    }

    setRefreshing(false);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const doRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  // [data, error, loading, refreshing, fetchNext, doRefresh]
  return [data, error, loading, refreshing, fetchData, doRefresh];
}
