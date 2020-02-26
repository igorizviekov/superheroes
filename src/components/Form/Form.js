import React, { useState, Fragment } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Form = props => {
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const history = useHistory();
  const [form, setForm] = useState({
    nickName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Nickname"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false
    },
    realName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Real Name"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false
    },
    phrase: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Phrase"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false
    },
    superpower: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Superpower"
      },
      value: "",
      validation: {
        required: true,
        minLength: 3
      },
      valid: false,
      touched: false
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Origin Description"
      },
      value: "",
      validation: {
        required: true,
        minLength: 5
      },
      valid: false,
      touched: false
    }
  });

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...form
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    setForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  const submitDataHandler = e => {
    e.preventDefault();
    setLoading(true);
    const data = {
      nickname: form.nickName.value,
      real_name: form.realName.value,
      superpowers: form.superpower.value,
      catch_phrase: form.phrase.value,
      origin_description: form.description.value,
      image: props.mainHero
    };

    axios
      .post(`https://superheroes-4388d.firebaseio.com/hero/.json`, data)
      .then(() => {
        setLoading(false);
        history.push("/");
      });
  };

  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key]
    });
  }

  let button = (
    <Button disabled={!formIsValid} clicked={submitDataHandler}>
      SUBMIT
    </Button>
  );
  if (loading) {
    button = <Spinner />;
  }

  let userForm = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  return (
    <Fragment>
      <form className="Form">
        {userForm}

        {button}
      </form>
    </Fragment>
  );
};

export default Form;
