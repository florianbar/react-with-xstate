import React, { useState } from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

import { Container, Input, Button, ErrorMessage } from "../components/styled";

const stateMachine = Machine({
  initial: "idle",
  context: {
    msg: "",
  },
  states: {
    idle: {
      on: {
        SUBMIT: [
          {
            target: "loading",
            cond: (ctx, event) =>
              event.data.name !== "" && event.data.card !== "",
          },
          {
            target: "error",
          },
        ],
      },
    },
    loading: {
      invoke: {
        id: "doPayment",
        src: () => fakePayment(),
        onDone: {
          target: "success",
          actions: assign({ msg: (ctx, event) => event.data }),
        },
        onError: {
          target: "error",
          actions: assign({ msg: (ctx, event) => event.data }),
        },
      },
    },
    error: {
      on: {
        SUBMIT: {
          target: "loading",
          cond: (ctx, event) =>
            event.data.name !== "" && event.data.card !== "",
        },
      },
    },
    success: {
      type: "final",
    },
  },
});

const fakePayment = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("Oh no!"), 2500);
  });
};

const Login = () => {
  const [machine, send] = useMachine(stateMachine);
  const [form, setForm] = useState({
    name: "",
    card: "",
  });

  console.log(machine.value);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send({ type: "SUBMIT", data: { ...form } });
        }}
      >
        <h1>State Machine Payment Form</h1>

        {machine.matches("error") ? (
          <ErrorMessage>{machine.context.msg}</ErrorMessage>
        ) : null}

        <Input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          type="number"
          id="card"
          value={form.card}
          onChange={(e) => setForm({ ...form, card: e.target.value })}
        />
        <Button type="submit">Pay Now</Button>
      </form>
    </Container>
  );
};

export default Login;
