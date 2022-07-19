import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const styles = {
    root: {
        fontFamily: `Cursive`
    },
    fileInput : {
        background : 'green'
    }
}


const AddCard = () => {

    
    const navigate = useNavigate();
    const [image,setImage] = useState({
        name : "",
        url : "",
        description : ""
    });


    const handleChange= (e) => {
        setImage({ ...image, [e.target.name] : e.target.value })
    }

    const handleSubmit = async() => {
        const data = await fetch('/' , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(image)
        });
        console.log(await data.json());
        alert("Image Uploaded");
        navigate("/");
    }




    return (
        <div className="container h-100" style={styles.root}>
            <div className="row my-auto h-100 align-items-center justify-content-center my-3">
                <div className='w-25 p-5 shadow-lg rounded'>
                    <h4>+ Add Image</h4>
                    <br />
                    <div className="d-flex flex-column">
                        <div className="mb-3">
                            <label htmlFor="image_name" className="form-label">Image URL</label>
                            <input type="text" className="form-control" name="url" id="image_name" onChange={handleChange} />
                        </div>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="image_name" className="form-label">Image Name</label>
                            <input type="text" className="form-control" name="name" id="image_name" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea type="text" className="form-control" name="description" id="description" onChange={handleChange} />
                        </div>
                        <button type="button" className='w-50 btn btn-primary' onClick={handleSubmit} >Submit </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default AddCard