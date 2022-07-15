import "styles/CatDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import useCatAPI, { Cat } from "utils/hooks/useCatAPI";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import isEmptyObject from "utils/helpers/isEmptyObject";

function CatDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchCatDetails } = useCatAPI();
  const [cat, setCat] = useState<Cat>({} as Cat);

  console.log("cat", cat);

  useEffect(() => {
    const getCat = async (id: string) => {
      const _cat = await fetchCatDetails(id);
      setCat(_cat);
    };

    if (id) {
      getCat(id);
    }
  }, [id]);

  return (
    <>
      {/* Header */}
      <div className="header">
        <Title>Cat Details Page</Title>
        <Button
          variant="info"
          style={{
            position: "absolute",
            left: "0",
            margin: "1rem 0",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "white",
            padding: "0.5rem 2rem",
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "30px",
            zIndex: "99999",
          }}
          onClick={() => navigate(`/?breed=${cat?.id}`)}
        >
          Back
        </Button>
        <div className="cat-container">
          {!isEmptyObject(cat) ? (
            <>
              <Image
                src={cat?.url}
                thumbnail={true}
                alt={cat?.name}
                className="cat-image"
              />
              <div className="cat-details">
                <p className="cat-name">{cat?.name}</p>
                <p className="cat-origin">From {cat?.origin}</p>
                <p className="cat-temperament">{cat?.temperament}</p>
                
                <p className="cat-description">{cat?.description}</p>
                
              </div>
            </>
          ) : (
            <p>Still loading your cat...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CatDetail;
