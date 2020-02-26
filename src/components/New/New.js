import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/Spinner/Spinner";
import "./New.css";
import Form from "../Form/Form";
export default function New() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [heroes, setHeroes] = useState("");
  const [mainHero, setMainHero] = useState(
    "https://res.cloudinary.com/igorizviekov/image/upload/v1582710014/superheroes/pngguru.com_9_xogxv9.png"
  );

  useEffect(() => {
    if (loading && !heroes.length) {
      axios
        .get(`https://superheroes-4388d.firebaseio.com/images/.json`)
        .then(response => {
          let images = [];
          for (let key in response.data) {
            images.push(response.data[key]);
          }
          setHeroes(images);
          setLoading(false);
        });
    }
  }, [heroes.length, loading]);

  if (loading) {
    return <Spinner />;
  }
  const chooseHandler = hero => {
    setMainHero(hero);
  };
  let imageList = heroes.map(hero => (
    <img
      role="presentation"
      src={hero}
      alt={hero[0]}
      key={hero}
      onClick={chooseHandler.bind(this, hero)}
    />
  ));

  const goBackHandler = () => {
    history.push("/");
  };

  return (
    <div className="CreateNew">
      <h1>Create your superhero!</h1>
      <section>
        <div className="MainImage">
          <img src={mainHero} alt={mainHero} className="MainCharacter" />
        </div>
        <Form mainHero={mainHero} />
      </section>
      <div className="ImageList">{imageList.slice(0, 8)}</div>
      <Button clicked={goBackHandler}>BACK</Button>
    </div>
  );
}
