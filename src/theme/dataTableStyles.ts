const scrollbarStyle = {
  "::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "#1A3C8A",
    backgroundClip: "padding-box",
    borderRadius: "9999px",
  },
};

const DataTableStyles = {
  Table: {
    variants: {
      primary: ({ colorScheme = "blue" }) => ({
        color: `${colorScheme}.50`,
      }),
    },
    defaultProps: {
      colorScheme: "green",
    },
  },
};

export { DataTableStyles, scrollbarStyle };
