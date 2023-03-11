import { Component } from 'react';
import '../index.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { inputValue } = this.state;
    return onSubmit(inputValue);
  };

  handleChange = e => {
    return this.setState(() => {
      return {
        inputValue: e.target.value,
      };
    });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            search
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
