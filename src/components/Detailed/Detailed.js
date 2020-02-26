import React, { useState, useEffect, Fragment } from "react";
import "./Detailed.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button";
const Detailed = props => {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [phrase, setPhrase] = useState([]);
  const [description, setDescription] = useState([]);
  const [power, setPower] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://superheroes-4388d.firebaseio.com/hero/${props.match.params.id}.json`
      )
      .then(response => {
        setNickname(response.data.nickname);
        setName(response.data.real_name);
        setPhrase(response.data.catch_phrase);
        setPower(response.data.superpowers);
        setImage(response.data.image);
        setDescription(response.data.origin_description);
        setLoading(false);
      });
  }, [props.match.params.id, phrase]);

  const history = useHistory();
  const goBackHandler = () => {
    history.push("/");
  };
  let heroDescription = (
    <Fragment>
      {" "}
      <h1>{nickname}</h1>
      <img src={image} alt={nickname} />
      <section>
        <p>
          <strong> Real name: </strong>
          {name}
        </p>
        <p>
          <strong> Superpower: </strong> {power}
        </p>
        <p>
          <strong> Phrase: </strong> {phrase}
        </p>
        <p>
          <strong> Origin: </strong> {description}
        </p>
      </section>
      <Button clicked={goBackHandler}>GO BACK</Button>
    </Fragment>
  );
  if (loading) {
    heroDescription = <Spinner />;
  }

  return <div className="Detailed">{heroDescription}</div>;
};

export default withRouter(Detailed);
