const ListItem = (props) => {
    const date = props.date;
    const distance = props.distance;
    const dateObj = props.dateObj;
    const onRemove = props.onRemove;
    const onEdit = props.onEdit;
  
    const handleRemove = () => {
      return onRemove(date);
    };
  
    const handleEdit = () => {
      return onEdit(date, distance, dateObj);
    };
  
    return (
      <li className="listItem">
        <div className="listDate">{date}</div>
        <div className="listDistance">{distance}</div>
        <div className="formButtons">
          <button className="listEditButton" onClick={handleEdit}>
            ✎
          </button>
          <button className="listRemoveButton" onClick={handleRemove}>
            ✘
          </button>
        </div>
      </li>
    );
  };
  
  export default ListItem;
  