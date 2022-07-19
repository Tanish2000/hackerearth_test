import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const styles = {
    root: {
        fontFamily: `Cursive`
    },
}


const Edit = () => {
    const { id } = useParams();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setImage({ ...image, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        const data = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(image)
        });
        console.log(await data.json());
        alert("Updated");
        navigate("/");
    }

    useEffect(() => {
        async function getData() {
            try {
                const result = await fetch(`/getImageData/${id}`);
                const data = await result.json();
                console.log(data)
                setImage(data);
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [])




    return (
        <div className="container h-100" style={styles.root}>
            <div className="row my-auto h-100 align-items-center justify-content-center my-3">
                {
                    image && (
                        <>
                            <div className='w-25 p-5 shadow-lg rounded'>
                                <h4>+ Edit</h4>
                                <br />
                                <div className="d-flex flex-column">
                                    <div className="mb-3">
                                        <label htmlFor="image_name" className="form-label">Image URL</label>
                                        <input type="text" className="form-control" value={image.url} name="url" id="image_name" onChange={handleChange} />
                                    </div>
                                    <br />
                                    <div className="mb-3">
                                        <label htmlFor="image_name" className="form-label">Image Name</label>
                                        <input type="text" className="form-control" value={image.name} name="name" id="image_name" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea type="text" className="form-control" value={image.description} name="description" id="description" onChange={handleChange} />
                                    </div>
                                    <button type="button" className='w-50 btn btn-primary' onClick={handleSubmit} >Submit </button>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Edit