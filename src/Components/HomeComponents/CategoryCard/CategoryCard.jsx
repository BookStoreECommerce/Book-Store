import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css'



const CategoryCard = ({ catName , img , sectionName,slug  }) => {

  
    return (
        <>
            
                        <div  className={sectionName === 'home' ? "col-lg-4 col-md-6 col-sm-6" : `col-lg-3 col-lg-3 col-md-6 col-sm-6 ${styles.cardImg}`} >
                           <Link to={`${slug}`}>
                           <div className={`${styles.imgCat} ${styles.fontSize} position-relative`} >
                           <div className={`${styles.overlayCat}`}>
                               <p>{catName}</p>
                           </div>
                           <img className="w-100 rounded-4" src={img} alt='' loading="lazy" />
                       </div>
                           </Link>
                        </div>
                    
                       
              
        </>
    );
}

export default CategoryCard;