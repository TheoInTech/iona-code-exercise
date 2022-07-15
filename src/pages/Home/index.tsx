import React, { useEffect, useState } from "react";
import "styles/Home.scss";
import useCatAPI, { Cat } from "utils/hooks/useCatAPI";

import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Redux Toolkit
import { useDispatch } from "redux/store";
import { setIsLoading } from "redux/slices/globalSlices";
import Title from "components/Title";
import useQuery from "utils/hooks/useQuery";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();

  const { catBreedList, fetchCatPerBreedList } = useCatAPI();
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [allCatsPerBreed, setAllCatsPerBreed] = useState<Cat[]>([]);
  const [currentCatsPerBreed, setCurrentCatsPerBreed] = useState<Cat[]>([]);
  const [loadMoreCounter, setLoadMoreCounter] = useState<number>(1);

  // How many items should be displayed initially and every load more
  const steps = 5;

  const handleCatBreedSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value);
    setAllCatsPerBreed([] as Cat[]);
    setLoadMoreCounter(1);
  };

  useEffect(() => {
    const breedFromQuery = query.get("breed");
    breedFromQuery && setSelectedBreed(breedFromQuery);
  }, []);

  useEffect(() => {
    const getCatPerBreed = async () => {
      /* 
        Since we get random cat images every fetch from the API,
        we need to get all the cats at once instead of using pagination 
      */
      const res = await fetchCatPerBreedList(selectedBreed);
      setAllCatsPerBreed(res);
    };

    if (selectedBreed) getCatPerBreed();
    else setCurrentCatsPerBreed([]);
  }, [selectedBreed]);

  useEffect(() => {
    setCurrentCatsPerBreed(allCatsPerBreed.slice(0, steps * loadMoreCounter));
  }, [allCatsPerBreed, loadMoreCounter]);

  return (
    <>
      {/* Header */}
      <div className="header">
        <Title>Cat Browser</Title>
        <span className="h5">😼 Choose a Cat Breed 😼</span>
        <Form.Select
          size="lg"
          className="selector"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCatBreedSelect(e)
          }
          value={selectedBreed}
        >
          <option key={0} value="">
            - Select a Cat Breed -
          </option>
          {catBreedList.map((breed) => {
            const { id, name } = breed;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </Form.Select>
      </div>

      {/* Cat List */}
      <div className="cat-container">
        {currentCatsPerBreed?.length > 0 ? (
          <>
            <span className="h5">
              Found ({allCatsPerBreed?.length}) cats of this breed
            </span>
            <div className="cat-list">
              {currentCatsPerBreed.map((cat) => {
                const { id, name, url } = cat;

                return (
                  <Card
                    style={{ width: "16rem", margin: "1rem" }}
                    key={id}
                    className="cat-card"
                  >
                    <Card.Img
                      variant="top"
                      src={url}
                      alt={name || ""}
                      loading="lazy"
                      onLoad={() => dispatch(setIsLoading(false))}
                      style={{
                        height: "14rem",
                        minWidth: "100%",
                        objectFit: "cover",
                        objectPosition: "50% 0%",
                      }}
                    />
                    <Button
                      variant="info"
                      style={{
                        fontSize: "14px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        color: "white",
                      }}
                      onClick={() => navigate(id)}
                    >
                      View Details
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* Load More Button */}
            {steps * loadMoreCounter < allCatsPerBreed.length && (
              <Button
                variant="primary"
                style={{
                  margin: "2rem 0",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "white",
                  padding: "0.5rem 4rem",
                }}
                onClick={() => setLoadMoreCounter(loadMoreCounter + 1)}
              >
                Load more
              </Button>
            )}
          </>
        ) : (
          <span className="h3">No cats available</span>
        )}
      </div>
    </>
  );
}

export default App;
