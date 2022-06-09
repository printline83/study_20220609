import React from "react";

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div className="input-group">
      <input
        className="form-control"
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        className="form-control"
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button className="btn btn-outline-success" onClick={onCreate}>
        등록
      </button>
    </div>
  );
}

export default React.memo(CreateUser);
