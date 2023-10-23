import React from "react";
import { useSelector } from "react-redux";
import MainSlider from "../../ReusableComponents/MainSlider/MainSlider";


const NewBooks = () => {
    const { newBooksArray } = useSelector((state) => state.books);
    let cutNewBooks = newBooksArray?.slice(0, 10);

    return (
        <>
            <section id="NewBooks" data-testid='NewBooks'>
            <MainSlider arr={cutNewBooks} title="New Arrivals" autoplay={false}/>
            </section>
        </>
    );
}

export default NewBooks;

    // const newBooks = newBooksArray?.map((ele) =>
    //  {return {"id": ele._id, "image": ele.image.secure_url, "name": ele.name, "slug": ele.slug, "author": ele.author}}); 
