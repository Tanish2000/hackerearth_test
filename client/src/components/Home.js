import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, Button, Grid, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const styles = {
    img: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    }
}

const Home = () => {
    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function getImages() {
            try {
                const result = await fetch("/getImages");
                const data = await result.json();
                setImages(data.images);
                console.log(data.images);
            } catch (err) {
                console.log(err);
            }
        }
        getImages();
    }, []);


    return (
        <>
            <div className="container-fluid mx-auto">
                <div className="d-flex w-75 mx-auto">
                    <div className="flex-grow-1">
                        <span className="h3" style={{ fontFamily: `Cursive` }}>Image Gallery</span>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={() => navigate('/new')}>+ Add Image</button>
                    </div>
                </div>
                <div className="row gx-0 justify-content-center w-100">
                    {
                        images && (
                            images.map((image) => {
                                return (
                                    <div className="col-3 m-2 border border-primary image_card">
                                        <Link to={`show/${image._id}`} key={image._id}>
                                            <img src={image.url} style={styles.img} alt={image.name} />
                                        </Link>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Home;