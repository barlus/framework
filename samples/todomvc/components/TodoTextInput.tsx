import * as React from '@barlus/react'
import { Theme } from '../styles/TodoEntry';
import { classes } from '../utils/classes'

export class TodoTextInput extends React.Component<{onSave?,newTodo?,editing?,placeholder?,text?}> {

  state = {
    text: this.props.text || ''
  };

  handleSubmit = e => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  };

  handleChange = e => {
    this.setState({ text: e.target.value })
  };

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  };

  render() {
    return (
      <input className={
        classes({
          edit: this.props.editing,
          [Theme.TodoEntry]: this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}
