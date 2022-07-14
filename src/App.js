import { useState, useEffect } from "react";
import PhonebookFilter from "./components/PhonebookFilter";
import PhonebookForm from "./components/PhonebookForm";
import PhonebookList from "./components/PhonebookList";
import personService from "./services/personService";
import Alert from "./components/Alert";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    console.log("fetching persons...");
    personService.getAll().then((response) => {
      console.log("persons obtained!");
      setPersons(response.data);
    });
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteClickHandler = (event) => {
    const values = event.target.value.split(",");
    const id = values[0];
    const name = values[1];

    const wantToDelete = window.confirm(`Delete ${name} ?`);

    if (wantToDelete) {
      personService.deletion(id).then((response) => {
        setPersons([...persons].filter((person) => person.id !== id)); //
      });
      setAlertMessage(
        [`${name} deleted!`, false]
      )
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000)
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (!persons.every(person => person.name !== newPerson.name)) {
      //Someone shares a name with the new person, issue update.
      const wantToUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (wantToUpdate) {
        const oldPerson = persons.find(person => person.name === newPerson.name);
        personService
        .update(oldPerson.id, newPerson)
        .then(response => {
          const id = response.data.id
          newPerson.id = id;
          setPersons(persons.map(person => person.name !== newPerson.name ? person : newPerson));
          setNewName("");
          setNewNumber("");
          setAlertMessage(
            [`${newPerson.name} updated!`, true]
          )
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error.response.data.error)
        setAlertMessage(
          [`${error.response.data.error}!`, false]
          )
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
      }
    } else {
      //Everyone has a different name, append.
      personService
      .create(newPerson)
      .then((response) => {
        const id = response.data.id
        newPerson.id = id;
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setAlertMessage(
          [`${newPerson.name} added!`, true]
        );
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000);
      }).catch(error => {
        console.log(error.response.data.error)
        setAlertMessage(
          [`${error.response.data.error}!`, false]
        )
      });setTimeout(() => {
        setAlertMessage(null)
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert alertMessage={alertMessage}/>
      <PhonebookFilter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <h2>add a new</h2>
      <PhonebookForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PhonebookList
        persons={persons}
        nameFilter={nameFilter}
        deleteClickHandler={deleteClickHandler}
      />
    </div>
  );
};

export default App;
