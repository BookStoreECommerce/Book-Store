// import React, { useEffect, useState } from "react";
// import styles from "./FilterPanel.module.css";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import { Box, useMediaQuery } from "@mui/material";
// import { useDispatch } from "react-redux";
// // import AllCategoriesSearch from "../AllCategoriesSearch/AllCategoriesSearch";

// const FilterPanel = () => {
//   const dispatch = useDispatch();
//   const [value, setValue] = useState(0);

//   const flipScreen = useMediaQuery("(max-width:991px)");
//   const isSmallScreen = useMediaQuery("(max-width:440px)");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <>
//       <nav
//         className={`sidebar d-flex flex-column h-100`}
//       >
//         <h3>
//           <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
//         </h3>

//         <Box sx={{ width: "100%" }}>
//           <Tabs
//             orientation={flipScreen ? "horizontal" : "vertical"}
//             sx={
//               flipScreen
//                 ? { borderBottom: 1, borderColor: "divider" }
//                 : { borderRight: 1, borderColor: "divider" }
//             }
//             onChange={handleChange}
//             value={value}
//             aria-label="Tabs where selection follows focus"
//             variant={isSmallScreen ? "scrollable" : "fullWidth"}
//             selectionFollowsFocus
//           >
//             <Tab label="User Info" />
//           </Tabs>
//         </Box>
//       </nav>
//     </>
//   );
// };

// export default FilterPanel;


import React, { useEffect, useState } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch } from "react-redux";
import AllCategoriesSearch from "../AllCategoriesSearch/AllCategoriesSearch";
import LanguageFilter from "../LanguageFilter/LanguageFilter";

const FilterPanel = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className={`sidebar d-flex flex-column h-100`}>
        <h3>
          <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
        </h3>
        <div>
            <AllCategoriesSearch/>
            <LanguageFilter/>
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
