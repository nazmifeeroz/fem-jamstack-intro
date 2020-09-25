import React, { useReducer } from "react"
import styles from "./form.module.css"

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChangeField = (field) => ({ target: { value } }) =>
    dispatch({ type: "CHANGE_FIELD", field, value })

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          value={state.name}
          className={styles.input}
          name="name"
          onChange={handleChangeField("name")}
        />
      </label>
      <label className={styles.label}>
        Email
        <input
          type="email"
          value={state.email}
          className={styles.input}
          name="email"
          onChange={handleChangeField("email")}
        />
      </label>
      <label className={styles.label}>
        Subject
        <input
          type="text"
          value={state.subject}
          className={styles.input}
          name="subject"
          onChange={handleChangeField("subject")}
        />
      </label>
      <label className={styles.label}>
        Body
        <textarea
          className={styles.input}
          onChange={handleChangeField("body")}
          value={state.body}
          name="body"
        />
      </label>
      <button className={styles.button}>Send</button>
    </form>
  )
}

export default Form
