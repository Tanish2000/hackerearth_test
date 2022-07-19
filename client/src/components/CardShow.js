import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const styles = {
  img: {
    width: '200px',
    height: '200px'
  }
}

const CardShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getImage() {
      try {
        const data = await fetch(`/getImageData/${id}`);
        setImage(await data.json());
        // console.log(await data.json());
      } catch (err) {
        console.log(err);
      }
    }
    getImage();
  }, [])


  const handleDelete = async() => {
    try{
      const data = await fetch(`/${id}/delete`, {
        method :'DELETE'
      })
      alert("Deleted");
      navigate('/');
    }catch(err)
    {
      console.log(err);
    }
  }


  return (
    <div className="container shodow-lg w-75">
      {
        image && (
          <>
            <div className='d-flex my-5 w-50'>
              <img src={image.url} style={styles.img} />
              <div className="d-flex flex-column p-4">
                <p>Image : {image.name}</p>
                <p>Details : {image.description}</p>
              <div>
                <button className='btn btn-primary mx-2' onClick={()=> navigate(`/${image._id}/edit`)}>Edit</button>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
              </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default CardShow