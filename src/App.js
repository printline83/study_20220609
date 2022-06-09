import React, { useRef, useReducer, useMemo, useCallback } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
import useInputs from "./UseInputs";

function countActiveUsers(users) {
  console.log("활성 사용자.");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "정대지",
      email: "test@naver.com",
      active: true,
      modify: false,
    },
    {
      id: 2,
      username: "헬린이",
      email: "test@naver.com",
      active: false,
      modify: false,
    },
    {
      id: 3,
      username: "경기",
      email: "test@naver.com",
      active: false,
      modify: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        inputs: state.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    case "MODIFY_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, modify: !user.modify } : user
        ),
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id
            ? {
                ...user,
                modify: !user.modify,
                username: action.username,
                email: action.email,
              }
            : user
        ),
      };
    default:
      throw new Error("에러!!");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const { username, email } = form;
  const nextId = useRef(state.users.length);
  const { users } = state;
  const onCreate = useCallback(
    (e) => {
      nextId.current += 1;
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      reset();
    },
    [username, email, reset]
  );

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  });

  const onModify = useCallback((id) => {
    dispatch({
      type: "MODIFY_USER",
      id,
    });
  });

  const onUpdate = useCallback((id, username, email) => {
    dispatch({
      type: "UPDATE_USER",
      id,
      username,
      email,
    });
  });

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="container">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <div className="counter">활성 사용자 수: {count}</div>
      <UserList
        users={users}
        onToggle={onToggle}
        onRemove={onRemove}
        onModify={onModify}
        onChange={onChange}
        onUpdate={onUpdate}
      />
    </div>
  );
}

export default App;
