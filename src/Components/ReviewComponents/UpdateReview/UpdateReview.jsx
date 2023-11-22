import { React } from "react";
import style from './UpdateReview.module.css';
import { handleReviewOpen } from "../../../Redux/Slicies/dialogSlice";
import { useDispatch } from "react-redux";


const UpdateReview = ({id,content,rating}) => {
  const dispatch = useDispatch()

  const getReviewContent = async (id,content,rating) => {
    console.log(id,rating,content);
    dispatch(handleReviewOpen())
}
    return ( 
        <>
      <button className={`btn ${style.updateBtn}`} onClick={() => getReviewContent(id,content,rating)}>Update</button>
        </>
     );
}
 
export default UpdateReview;