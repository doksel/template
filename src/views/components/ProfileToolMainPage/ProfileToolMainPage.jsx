import React from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import "./ProfileToolMainPage.less";

const ProfileToolMainPage = ({ user }) => (
  <div className="paper small-shadow">
    <div className="profile-tool-main-page">
      <div
        style={user.image ? { backgroundImage: `url(${user.image})` } : {}}
        className="profile-tool_user-image"
      >
        <Icon type="user" style={{ fontSize: "20px" }} />
      </div>

      <div className="split-line" />

      <div className="profile-info">
        <ul>
          <li>
            <span>Вітаємо,</span>{" "}
            <b>
              {user.firstName} {user.lastName}
            </b>
          </li>

          <li>
            <span>Посада:</span> {user.roles[0].displayName}
          </li>
        </ul>

        <ul>
          <li>
            <span>Країна:</span> {user.department.country.name}
          </li>

          <li>
            <span>Установа:</span> {user.department.name}
          </li>

          <li>
            <span>Код:</span> {user.department.code}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(ProfileToolMainPage);
