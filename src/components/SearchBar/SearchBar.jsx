import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  function handleSubmit(event) {
    const notify = () => toast("Search field must be filled");
    event.preventDefault();
    const searchRequest = event.target.elements.search.value.trim();
    if (searchRequest !== "") {
      onSubmit(searchRequest);
    } else {
      notify();
    }
    event.target.reset();
  }
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="search"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
