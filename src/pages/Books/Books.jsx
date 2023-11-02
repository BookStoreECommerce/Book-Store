import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllBook from "../../Components/AllBooks/AllBooks";
import FilterPanel from "../../Components/FilterComponents/FilterPanel/FilterPanel";
import ScrollToTop from "../../Components/ReusableComponents/ScrollToTop/ScrollToTop";
import {removeFooterMargin,setFooterMargin,} from "../../Redux/Slicies/appSlice";
export default function Books() {
  const dispatch = useDispatch();
  const { footerH, navH } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}>
        <div className="container-fluid justify-content-evenly row w-100 py-5">
          <div className="col-lg-3 col-md-10 col-12">
            <FilterPanel />
          </div>
          <div className="col-lg-8 col-md-10 col-12">
            <AllBook />
          </div>
        </div>
      </Box>
    </>
  );
}
