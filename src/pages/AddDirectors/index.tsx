import * as React from 'react';
import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import uniqid from 'uniqid';

import { AppContext } from 'containers/AppWrapper';
import Button from 'components/Button';
import services from 'services';
import { TDirector } from 'models/type';

import 'components/form/index.css';
import './AddDirectors.css';

interface IFormInput {
  [key: string]: string;
}

const AddDirectors = (): JSX.Element => {
  const [directors, setDirectors] = useState<TDirector[]>([
    {
      id: uniqid(),
      directorName: '',
      email: '',
    },
  ]);

  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  // if (!appContext.email) {
  //   // This should be redirected to login page in real world
  //   throw Error('User is not logged in!');
  // }

  const shapeObj = directors.reduce((accu, director) => {
    return {
      ...accu,
      [`email-${director.id}`]: yup.string().email('Please input a valid email').required('Email is required'),
      [`directorName-${director.id}`]: yup.string().required('Director name is required'),
    };
  }, {});

  const schema = yup.object().shape(shapeObj).required();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const { profileService } = services;

  const onDirectNameChange = (directorName: string, index: number): void => {
    setDirectors((directors) => {
      const director = directors[index];
      director.directorName = directorName;
      return [...directors];
    });
  };

  const onEmailChange = (email: string, index: number): void => {
    setDirectors((directors) => {
      const director = directors[index];
      director.email = email;
      return [...directors];
    });
  };

  const onSubmitHandler = () => {
    appContext.email && profileService.updateDirectors(appContext.email, directors);
    navigate('/signup/user-profile');
  };

  const onAddClickHandler = (): void => {
    setDirectors((directors) => {
      return [
        ...directors,
        {
          id: uniqid(),
          directorName: '',
          email: '',
        },
      ];
    });
  };

  const onRemoveClickHandler = (index: number): void => {
    setDirectors((directors) => {
      const updatedDirectors = [...directors];
      updatedDirectors.splice(index, 1);
      return updatedDirectors;
    });
    trigger();
  };

  const directorRows = directors.map((director, index) => {
    const { directorName, email, id } = director;
    const directorNumber = index + 1;
    return (
      <div key={id} className="form__row">
        {/* <-- director name--> */}
        <div className="form__field">
          <label className="form__label" htmlFor={`directorName-${id}`}>
            Director {directorNumber} name
          </label>
          <input
            {...register(`directorName-${id}`)}
            id={`directorName-${id}`}
            name={`directorName-${id}`}
            className="form__input"
            onChange={(e): void => {
              const value = e.target.value;
              onDirectNameChange(value, index);
            }}
            value={directorName}
          />
          {errors[`directorName-${id}`] && (
            <span className={`${[`directorName-${id}`] ? 'form__error-active' : 'form__error-inactive'}`}>
              {errors[`directorName-${id}`]?.message}
            </span>
          )}
        </div>
        {/* <-- email field --> */}
        <div className="form__field">
          <label className="form__label" htmlFor={`email-${id}`}>
            Email
          </label>
          <input
            {...register(`email-${id}`)}
            id={`email-${id}`}
            name={`email-${id}`}
            className="form__input"
            onChange={(e): void => {
              const value = e.target.value;
              onEmailChange(value, index);
            }}
            value={email}
          />
          {errors[`email-${id}`] && (
            <span className={`${[`email-${id}`] ? 'form__error-active' : 'form__error-inactive'}`}>
              {errors[`email-${id}`]?.message}
            </span>
          )}
        </div>
        <button
          className={`addDirectors__button-remove ${
            index > 0 ? 'addDirectors__button-remove-active' : 'addDirectors__button-remove-hidden'
          }`}
          onClick={() => onRemoveClickHandler(index)}
        >
          <ClearIcon />
        </button>
      </div>
    );
  });
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="addDirectors">
        <h2 className="addDirectors__title">Directors</h2>
        <div className="addDirectors__form">
          {directorRows}
          <Button rootClass="addDirectors__button-add" onClick={onAddClickHandler}>
            Add
          </Button>
          <Button onClick={handleSubmit(onSubmitHandler)}>Next</Button>
        </div>
      </div>
    </form>
  );
};

export default AddDirectors;
