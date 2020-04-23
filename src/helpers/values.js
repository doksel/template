export const breakpointsLayout = {
  xs: "480px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1440px",
  xxl: "1600px"
};

export const formatDate = "YYYY-MM-DD";
export const formatDateView = "DD.MM.YYYY";

// FAKE VALUES
export const columnsCountries = [
  {
    Header: "Name",
    columns: [
      {
        Header: "name",
        accessor: "name"
      },
      {
        Header: "shortName",
        accessor: "shortName",
        isSorting: true
      },
      {
        Header: "codeThreeStr",
        accessor: "codeThreeStr",
        isSorting: true
      }
    ]
  }
];

export const listNavBar = [
  {
    name: "link 1",
    link: "/link1"
  },
  {
    name: "link 2",
    link: "/link2",
    subMenu: [
      {
        name: "subLink 1",
        link: "/subLink1"
      },
      {
        name: "subLink 2",
        link: "/subLink2"
      }
    ]
  },
  {
    name: "link 3",
    link: "/link3"
  }
];
