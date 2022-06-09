import React from "react";
import ModifyUser from "./ModifyUser";

const User = React.memo(function User({
  user,
  onRemove,
  onToggle,
  onModify,
  onUpdate,
}) {
  const { username, email, id, active } = user;
  const style = {
    color: active ? "green" : "black",
    cursor: "pointer",
  };
  return (
    <div className="list_box">
      <div className="list_group">
        <div className="user">
          <b style={style} onClick={() => onToggle(id)}>
            {username}
          </b>
          &nbsp;
          <span>({email})</span>
        </div>
        <button className="btn btn-outline-danger" onClick={() => onRemove(id)}>
          삭제
        </button>
        <button className="btn btn-outline-dark" onClick={() => onModify(id)}>
          수정
        </button>
      </div>
      <ModifyUser user={user} onUpdate={onUpdate} />
    </div>
  );
});

function UserList({ users, onRemove, onModify, onToggle, onUpdate }) {
  return (
    <div className="user_list">
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
          onModify={onModify}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default React.memo(
  UserList,
  (prevProps, nextProps) => nextProps.users === prevProps.users
);
