import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon, Button, Tooltip, message } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { updateDataTable } from "../../../state/ducks/table/actions";
import { ERROR_MESSAGE } from "../../../helpers/values";

import "./TableActions.less";

const TableAction = ({
  canCopy,
  canDelete,
  canEdit,
  endpointDelete,
  urlCopy,
  urlEdit,
  history,
  getReq,
  lastQueryParams,
  updateDataTable
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteButton = (
    <Button
      disabled={!canDelete}
      className="action"
      loading={loadingDelete}
      onClick={async () => {
        setLoadingDelete(true);

        await endpointDelete()
          .then(() => {
            message.success(
              "Заява успішно видалена. Зачекайте оновлення таблиці"
            );
            updateDataTable(getReq, lastQueryParams);
          })
          .catch(() => message.success(ERROR_MESSAGE));

        setLoadingDelete(false);
      }}
      shape="circle"
      type="danger"
      ghost
      size="default"
    >
      {!loadingDelete && <Icon type="delete" theme="filled" />}
    </Button>
  );

  const editButton = (
    <Button
      className="action"
      onClick={() => history.push(urlEdit)}
      shape="circle"
      ghost={!canEdit}
      size="default"
      disabled={!canEdit}
    >
      <Icon type="edit" theme="filled" />
    </Button>
  );

  return (
    <span className="table-action">
      {canEdit ? (
        <Tooltip title="Редагувати" placement="bottom">
          {editButton}
        </Tooltip>
      ) : (
        editButton
      )}

      {canCopy && (
        <Tooltip title="Копіювати" placement="bottom">
          <Button
            className="action"
            onClick={() => history.push(urlCopy)}
            shape="circle"
            size="default"
          >
            <Icon type="copy" theme="filled" />
          </Button>
        </Tooltip>
      )}

      {canDelete ? (
        <Tooltip title="Видалити" placement="bottom">
          {deleteButton}
        </Tooltip>
      ) : (
        deleteButton
      )}
    </span>
  );
};

const mapStateToProps = ({ table }) => ({
  getReq: table.req,
  lastQueryParams: table.lastQueryParams
});

const mapDispatchToProps = { updateDataTable };

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(TableAction);
