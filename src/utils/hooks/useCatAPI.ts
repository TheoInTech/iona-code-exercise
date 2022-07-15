import { useEffect, useState } from "react";

// Redux Toolkit
import { useDispatch } from "redux/store";
import { setIsLoading, setError } from "redux/slices/globalSlices";

export interface Cat {
  id: string;
  name: string;
  description: string;
  origin: string;
  temperament: string;
  url: string;
}

const useCatAPI = () => {
  const dispatch = useDispatch();
  const [catBreedList, setCatBreedList] = useState<Cat[]>([]);

  const fetchCatBreedList = async () => {
    dispatch(setIsLoading(true));
    dispatch(setError(false));

    const api = "https://api.thecatapi.com/v1/breeds";

    try {
      const rawData = await fetch(api).then((res) => res.json());

      const data = await Promise.all(
        rawData?.map((raw: Cat) => {
          return {
            id: raw?.id,
            name: raw?.name,
            description: raw?.description,
            origin: raw?.origin,
            temperament: raw?.temperament,
            url: raw?.url,
          } as Cat;
        })
      );

      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      const error = err?.data?.message ?? err?.message ?? JSON.stringify(err);
      console.error(error);

      dispatch(setError(true));
      dispatch(setIsLoading(false));
      return [];
    }
  };

  const fetchCatPerBreedList = async (id: string) => {
    dispatch(setError(true));
    dispatch(setError(false));

    const api = `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=100`;

    try {
      const rawData = (await fetch(api).then((res) => res.json())) as Cat[];

      const data: Cat[] = [];
      await Promise.all(
        rawData?.map((raw: Cat) => {
          // Eliminate duplicates
          if (!data.find((el) => el.url === raw.url || el.id === raw.id)) {
            data.push({
              id: raw?.id,
              name: raw?.name,
              description: raw?.description,
              origin: raw?.origin,
              temperament: raw?.temperament,
              url: raw?.url,
            } as Cat);
          }
        })
      );

      dispatch(setIsLoading(false));

      return data;
    } catch (err) {
      const error = err?.data?.message ?? err?.message ?? JSON.stringify(err);
      console.error(error);

      dispatch(setError(true));
      dispatch(setIsLoading(false));
      return [];
    }
  };

  const fetchCatDetails = async (id: string) => {
    dispatch(setIsLoading(true));
    dispatch(setError(false));

    const api = `https://api.thecatapi.com/v1/images/${id}`;

    try {
      const rawData = await fetch(api).then((res) => res.json());

      const { url, breeds } = rawData
      const { id, name, description, origin, temperament } = breeds[0]
      const data = {
        id,
        name,
        description,
        origin,
        temperament,
        url,
      } as Cat;

      dispatch(setIsLoading(false));
      return data;
    } catch (err) {
      const error = err?.data?.message ?? err?.message ?? JSON.stringify(err);
      console.error(error);

      dispatch(setError(true));
      dispatch(setIsLoading(false));
      return {} as Cat;
    }
  };

  useEffect(() => {
    fetchCatBreedList().then((catBreedList) => {
      setCatBreedList(catBreedList);
    });
  }, []);

  return {
    fetchCatPerBreedList,
    fetchCatDetails,

    // Views
    catBreedList,
  };
};

export default useCatAPI;
