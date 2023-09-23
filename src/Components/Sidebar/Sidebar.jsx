// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import styles from "./Sidebar.module.css";

// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";

// function samePageLinkNavigation(event) {
//     if (
//       event.defaultPrevented ||
//       event.button !== 0 || // ignore everything but left-click
//       event.metaKey ||
//       event.ctrlKey ||
//       event.altKey ||
//       event.shiftKey
//     ) {
//       return false;
//     }
//     return true;
//   }

// function LinkTab(props) {
//     return (
//       <Tab
//         component="a"
//         onClick={(event) => {
//           // Routing libraries handle this, you can remove the onClick handle when using them.
//           if (samePageLinkNavigation(event)) {
//             event.preventDefault();
//           }
//         }}
//         {...props}
//       />
//     );
//   }

// const Sidebar = () => {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//       // event.type can be equal to focus with selectionFollowsFocus.
//       if (
//         event.type !== 'click' ||
//         (event.type === 'click' && samePageLinkNavigation(event))
//       ) {
//         setValue(newValue);
//       }
//     };

//   return (
//     <>
//       <div className="row w-100">
//         <div className="col-3">
//           <nav
//             className={`sidebar d-flex flex-column align-item-start p-3 h-100 ${styles.sidebarStyle}`}
//           >
//             <h3 className="my-4">
//               <div>User Profile</div>
//             </h3>

//             {/* <ul className="list-group">
//             <Link className="list-group-item active" aria-current="true" to=''><i className="fa-solid fa-user"></i> User info</Link>
//             <Link className="list-group-item" to="favourites"><i className="fa-solid fa-heart"></i> Favourites</Link>
//             <Link className="list-group-item" to="settings"><i className="fa-solid fa-gear"></i> Settings</Link>
//         </ul> */}

//             <Box sx={{ width: "100%" }}>
//               <Tabs
//               orientation="vertical"
//               sx={{ borderRight: 1, borderColor: 'divider' }}
//                 onChange={handleChange}
//                 value={value}
//                 aria-label="Tabs where selection follows focus"
//                 selectionFollowsFocus
//               >
//                 <LinkTab href="" icon={<i className="fa-solid fa-user"></i>} iconPosition="start" label="User Info" />
//                 <LinkTab href="favourites" icon={<i className="fa-solid fa-heart"></i>} iconPosition="start" label="Favourites" />
//                 <LinkTab icon={<i className="fa-solid fa-gear"></i>} iconPosition="start" label="Settings" />
//               </Tabs>
//             </Box>
//           </nav>
//         </div>
//         <div className="col-9">
//           <Outlet></Outlet>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function samePageLinkNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }

function LinkTab(props) {
    return (
      <Tab
        component="a"
        // onClick={(event) => {
        //   // Routing libraries handle this, you can remove the onClick handle when using them.
        //   if (samePageLinkNavigation(event)) {
        //     event.preventDefault();
        //   }
        // }}
        {...props}
      />
    );
  }

const Sidebar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      // event.type can be equal to focus with selectionFollowsFocus.
      if (
        event.type !== 'click' ||
        (event.type === 'click' && samePageLinkNavigation(event))
      ) {
        setValue(newValue);
      }
    };

  return (
    <>
      <div className="row w-100">
        <div className="col-3">
          <nav
            className={`sidebar d-flex flex-column align-item-start p-3 h-100 ${styles.sidebarStyle}`}
          >
            <h3 className="my-4">
              <div>User Profile</div>
            </h3>

            <Box sx={{ width: "100%" }}>
              <Tabs
              orientation="vertical"
              sx={{ borderRight: 1, borderColor: 'divider' }}
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
                selectionFollowsFocus
              >
                <LinkTab to="" icon={<i className="fa-solid fa-user"></i>} iconPosition="start" label="User Info" />
                <LinkTab to="favourites" icon={<i className="fa-solid fa-heart"></i>} iconPosition="start" label="Favourites" />
                <LinkTab href="settings" icon={<i className="fa-solid fa-gear"></i>} iconPosition="start" label="Settings" />
              </Tabs>
            </Box>
          </nav>
        </div>
        <div className="col-9">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

