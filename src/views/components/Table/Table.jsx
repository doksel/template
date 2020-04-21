import React from "react";
import { withRouter } from "react-router-dom";
import TableUI from "../../ui/Table/Table";

import s from "./Table.module.less";

const Table = () => {
  const columns = [
    {
      Header: "First Name",
      columns: [
        {
          Header: "First Name",
          accessor: "firstName"
        }
      ]
    },
    {
      Header: "Last Name",
      columns: [
        {
          Header: "Last Name",
          accessor: "lastName",
          isSorting: true
        }
      ]
    },
    {
      Header: "Age",
      columns: [
        {
          Header: "Age",
          accessor: "age",
          isSorting: true
        }
      ]
    }
  ];

  const data = [
    {
      firstName: "firstName1",
      lastName: "lastName1",
      age: "age1"
    },
    {
      firstName: "firstName2",
      lastName: "lastName2",
      age: "age2"
    },
    {
      firstName: "firstName3",
      lastName: "lastName3",
      age: "age3"
    }
  ];

  return (
    <div className={s.wrap_table}>
      <TableUI columns={columns} data={data} withoutHeader={true} />
    </div>
  );
};

export default withRouter(Table);
