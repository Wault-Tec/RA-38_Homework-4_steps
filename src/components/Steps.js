import { useState, useRef } from "react";
import ListItem from "./ListItem";
import { v4 } from "uuid";

const Steps = () => {
  const [form, setForm] = useState({
    date: "",
    dateObj: "",
    distance: ""
  });

  const [items, setItems] = useState([]);

  const dateRef = useRef();
  const distRef = useRef();

  const handleChangeDate = (evt) => {
    setForm((prevForm) => ({
      ...prevForm,
      date: evt.target.value,
      dateObj: new Date(evt.target.value.split(".").reverse())
    }));
  };

  const handleChangeDistance = (evt) => {
    setForm((prevForm) => ({
      ...prevForm,
      distance: Number(evt.target.value)
    }));
  };

  const getItemsSort = (newItems) => {
    for (let i = 0; i < newItems.length - 1; i++) {
      for (let j = i + 1; j < newItems.length; j++) {
        if (newItems.length === 1) {
          return newItems;
        } else if (newItems[i].date === newItems[j].date) {
          newItems[i].distance += newItems[j].distance;
          newItems.splice(j, 1);
        }
      }
    }
    return newItems;
  };

  const getTestData = (date, distance) => {
    if (date === "" || distance === "") {
      alert("Введите данные");
      return true;
    } else if (!/^\d{2}.\d{2}.\d{4}$/.test(date)) {
      alert("Некорректно введена дата");
      return true;
    } else if (!/^\d+$/.test(distance)) {
      alert("Некорректно введена дистанция");
      return true;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (getTestData(form.date, form.distance)) {
      return;
    }

    const newItems = [...items];
    newItems.unshift(form);

    const newItemsSort = getItemsSort(newItems);
    newItemsSort.sort((a, b) => b.dateObj - a.dateObj);

    setItems(newItemsSort);

    dateRef.current.value = "";
    distRef.current.value = "";
    setForm((prevForm) => ({
      ...prevForm,
      date: "",
      dateObj: "",
      distance: ""
    }));
  };

  const handleRemove = (date) => {
    setItems((prevItems) => prevItems.filter((o) => o.date !== date));
  };

  const handleEdit = (date, distance, dateObj) => {
    setForm((prevForm) => ({
      ...prevForm,
      date: date,
      distance: distance,
      dateObj: dateObj
    }));
    dateRef.current.value = date;
    distRef.current.value = distance;
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <label htmlFor="Date" className="formLabel">
            Дата
          </label>
          <input
            name="Date"
            id="Date"
            ref={dateRef}
            className="formInput"
            onChange={handleChangeDate}
            placeholder={"ДД.ММ.ГГ"}
            autoComplete={"off"}
          ></input>
        </div>
        <div className="inputWrapper">
          <label htmlFor="Distance" className="formLabel">
            Пройдено км
          </label>
          <input
            name="Distance"
            id="Distance"
            ref={distRef}
            className="formInput"
            onChange={handleChangeDistance}
            autoComplete={"off"}
          ></input>
        </div>
        <button type="submit" className="formButton" onSubmit={handleSubmit}>
          OK
        </button>
      </form>
      <div className="listHeader">
        <div>Дата</div>
        <div className="listHeader__dist">Пройдено км</div>
        <div>Действия</div>
      </div>
      <ul className="formList">
        {items.map((item) => (
          <ListItem
            date={item.date}
            distance={item.distance}
            dateObj={item.dateObj}
            onRemove={handleRemove}
            onEdit={handleEdit}
            key={v4()}
          />
        ))}
      </ul>
    </>
  );
};

export default Steps;
