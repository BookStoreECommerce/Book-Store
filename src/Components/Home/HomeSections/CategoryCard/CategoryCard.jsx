import React from "react";
const CategoryCard = ({ shuffledArray }) => {


    return (
        <>
        
                <div className="row offset-md-1 justifiy-content-center align-items-center gy-4 mt-4">
                    <div className="col-lg-5 col-md-12">

                        <div className="row gy-4 ">
                            <div className="col-md-6 col-sm-6">
                                <img className="w-100 rounded-4" src={ shuffledArray[0].img } />
                            </div>
                            <div className="col-md-6 col-sm-6">
                            <img className="w-100 rounded-4" src={ shuffledArray[1].img } />
                            </div>
                            <div className="col-md-6 col-sm-6">
                            <img  className="w-100 rounded-4" src={ shuffledArray[3].img } />
                            </div>
                            <div className="col-md-6 col-sm-6">
                            <img className="w-100 rounded-4" src={ shuffledArray[4].img } />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                    <img className="w-100 rounded-4" src={ shuffledArray[2].img } />
                    </div>

                </div>

        </>
    );
}

export default CategoryCard;