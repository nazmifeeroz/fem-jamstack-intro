import React, { useReducer } from "react"
import styles from "./form.module.css"

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value }
    case "CHANGE_STATUS":
      return { ...state, status: action.status }

    case "RESET":
    default:
      return INITIAL_STATE
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const setStatus = (status) => dispatch({ type: "CHANGE_STATUS", status })

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus("PENDING")

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp", resp)
        setStatus("SUCCESS")
      })
      .catch((err) => {
        console.error("err", err)
        setStatus("ERROR")
      })
  }

  const handleChangeField = (field) => ({ target: { value } }) =>
    dispatch({ type: "CHANGE_FIELD", field, value })

  if (state.status === "SUCCESS") {
    return (
      <p className={styles.success}>
        Message sent!
        <button
          className={`${styles.button} ${styles.centered}`}
          type="reset"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
      </p>
    )
  }

  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
      <form
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
        onSubmit={handleSubmit}
      >
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
    </>
  )
}

export default Form
