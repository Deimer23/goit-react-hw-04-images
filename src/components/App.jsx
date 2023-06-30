import React, {useState} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import  getImage from "path/to/services/Requestsapi/Requestsapi";
import { BallTriangle } from "react-loader-spinner";

const App =()=>{
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [imaLarge, SetImaLarge] = useState("");    

  function generarURL(string){
    let arrayUrl = string.split(" ");    
    let url = arrayUrl.join("+");       
    return url;
  }

  const getSearch = async(e)=>{
    e.preventDefault();     
    const search = e.currentTarget.elements.query.value;    
    if(search !== ""){
      setIsLoading(true);
      setQuery(search);
      setPage(2);      
      try {
        const response = await getImage(generarURL(search), page);  
        setArticle(response.hits);
        setIsLoading(false);       
      } catch (error) {
        console.log(error)
      }
          
    }else{
      alert('Por favor inserte lo que desea buscar')
    }         
  }

  const loadMore = async()=>{
    setPage(page+1);
    setIsLoading(true);        
    const response = await getImage(query, page);  
    setArticle(response.hits)  
    setIsLoading(false)      
  }

  const onModal = (e)=>{
    const imaLarge = e.target.dataset.img;
    SetImaLarge(imaLarge) ;    
  }

 const  resetImaLarge = ()=>{
   SetImaLarge("");
  }

    return(
      <div className="App"
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <Searchbar getSearch = {getSearch}/>        
        <ImageGallery>
          {isLoading ? <BallTriangle
                                        height={100}
                                        width={100}
                                        radius={5}
                                        color="#4fa94d"
                                        ariaLabel="ball-triangle-loading"
                                        wrapperClass={{}}
                                        wrapperStyle=""
                                        visible={true}
                                      /> 
                                    : <ImageGalleryItem image={article} onModal={onModal}/>}          
        </ImageGallery>
        {article.length > 0 ? <Button onLoadMore={loadMore} /> : ""}
        {imaLarge !== "" ? <Modal imaLarge={imaLarge} resetImaLarge={resetImaLarge}/> : ""}
      </div>
    )
  
};


export default App;