import React, { useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";
import "./Hero.css";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { useHistory } from "react-router-dom";
const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [heroes, setHeroes] = useState([]);
  const history = useHistory();
  if (loading && !heroes.length) {
    axios
      .get(`https://superheroes-4388d.firebaseio.com/hero/.json`)
      .then(response => {
        let heroes = [];
        for (let key in response.data) {
          heroes.push({ ...response.data[key], id: key });
        }
        const newestFirst = heroes.reverse();
        setHeroes(newestFirst);
        setLoading(false);
      });
  }
  if (loading) {
    return <Spinner />;
  }

  const createNewHandler = () => {
    history.push("/new");
  };
  const deleteHandler = id => {
    axios
      .delete(`https://superheroes-4388d.firebaseio.com/hero/${id}/.json`)
      .then(() => {
        setHeroes(heroes.filter(ig => ig.id !== id));
      });
  };
  let list = heroes.map(hero => (
    <section key={hero.id}>
      <h2>{hero.nickname}</h2>
      <img src={hero.image} alt={hero.nickname} />
      <div className="Buttons">
        <Link to={hero.id}>More</Link>
        <button onClick={deleteHandler.bind(this, hero.id)}>DELETE</button>
      </div>
    </section>
  ));

  return (
    <div className="Hero">
      <h1>Hero List</h1>
      <br />
      <div className="List">{list.slice(0, 5)}</div>
      <br />
      <Button clicked={createNewHandler}>CREATE NEW</Button>
    </div>
  );
};

export default Hero;
