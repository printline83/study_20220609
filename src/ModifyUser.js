import React from "react";
import useInputs from "./UseInputs";

function ModifyUser({ user, onUpdate }) {
  const { username, email, id, modify } = user;
  const [form, onChange] = useInputs({
    modi_username: username,
    modi_email: email,
  });
  const { modi_username, modi_email } = form;
  return (
    <div
      className="modify_user input-group"
      style={{ display: modify ? "flex" : "none" }}
    >
      <input
        className="form-control"
        name="modi_username"
        placeholder="계정명"
        onChange={onChange}
        defaultValue={modi_username}
      />
      <input
        className="form-control"
        name="modi_email"
        placeholder="이메일"
        onChange={onChange}
        defaultValue={modi_email}
      />

      <button
        className="btn btn-outline-success"
        onClick={() => onUpdate(id, modi_username, modi_email)}
      >
        수정완료
      </button>
    </div>
  );
}

export default React.memo(ModifyUser);
