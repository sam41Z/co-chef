const SelectStyles = {
  styles: {
    control: (styles: any, state: any) => ({
      ...styles,
      paddingBottom: "1px",
      boxShadow: "none",
      borderColor: state.isFocused ? "#ff00ff" : "#b200b2",
      ":hover": { cursor: "pointer", borderColor: "#ff00ff" },
    }),
    container: (styles: any) => ({
      ...styles,
      margin: "0.2rem",
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      ":hover": { color: "#ff00ff" },
    }),
    menu: (styles: any) => ({
      ...styles,
      border: "0.12rem solid #590059",
      boxShadow: "0 0 0.1rem #00e000",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: state.isFocused ? "#140014" : "none",
      color: "#00e000",
      ":hover": {
        cursor: "pointer",
        color: "#00ff00",
        boxShadow: "0 0 0.005rem #00ff00",
        backgroundColor: "#140014",
      },
    }),
    input: (styles: any) => ({
      ...styles,
      marginLeft: 0,
    }),
  },
  theme: (theme: any) => ({
    ...theme,
    borderRadius: "0.2rem",
    colors: {
      ...theme.colors,
      primary: "#00e000",
      primary25: "b200b2",
      primary50: "#ff00ff",
      primary75: "#ff00ff",
      neutral0: "black",
      neutral5: "black",
      neutral10: "#ff00ff",
      neutral20: "#b200b2",
      neutral30: "#ff00ff",
      neutral40: "#ff00ff",
      neutral50: "#00e000",
      neutral60: "#b200b2",
      neutral70: "#ff00ff",
      neutral80: "#00e000",
      neutral90: "#ff00ff",
      danger: "yellow",
    },
  }),
};
export default SelectStyles;
