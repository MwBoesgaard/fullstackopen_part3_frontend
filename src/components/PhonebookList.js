const PhonebookList = ({persons, nameFilter, deleteClickHandler}) => {
    const personsToShow =
    nameFilter.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

    return (
      <div>
        {personsToShow.map(person => (
          <p key={person.id}>
            {person.name} {person.number} <button value={[person.id, person.name]} onClick={deleteClickHandler}>delete</button>
          </p>
        ))}
      </div>
    );
  };
export default PhonebookList;