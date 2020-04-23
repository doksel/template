import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import TableUI from "../../ui/Table/Table";
import api from "../../../api";
import s from "./Table.module.less";

import { columnsCountries } from "../../../helpers/values";

const Table = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    await api.common.getContries().then(res => {
      let countries = res.map(elem => ({
        name: elem.name,
        shortName: elem.shortName,
        codeThreeStr: elem.codeThreeStr
      }));

      setCountries(countries);
    });
  };

  return (
    <div className={s.wrap_table}>
      <TableUI columns={columnsCountries} data={countries} isPagination />
    </div>
  );
};

export default withRouter(Table);
