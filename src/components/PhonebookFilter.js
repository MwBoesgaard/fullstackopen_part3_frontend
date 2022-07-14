const PhonebookFilter = ({nameFilter, handleNameFilterChange}) => {
    return (
      <div>
        <p>
          filter shown with{" "}
          <input value={nameFilter} onChange={handleNameFilterChange} />
        </p>
      </div>
    );
  };
  export default PhonebookFilter;