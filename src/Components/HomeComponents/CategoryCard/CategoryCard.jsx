import styles from './CategoryCard.module.css'



const CategoryCard = ({ catName , img , sectionName  }) => {

  
    return (
        <>
            
                        <div  className={sectionName === 'home' ? "col-lg-4 col-md-6 col-sm-6" : `col-lg-3 col-lg-3 col-md-6 col-sm-6 ${styles.cardImg}`} >
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat}`}>
                                    <p>{catName}</p>
                                </div>
                                <img className="w-100 rounded-4" src={img} alt='' loading="lazy" />
                            </div>
                        </div>
                    
                       
              
        </>
    );
}

export default CategoryCard;