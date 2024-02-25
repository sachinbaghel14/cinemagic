import { useEffect, useState } from "react"
import { carousel } from "../../connection"
import "./Carousel.css"

import Carousel from 'react-bootstrap/Carousel';
import { Rating } from "./Rating"


export default function HomeCarousel(props) {
    return (
        <Carousel fade indicators={true}>
            {props.items && props.items.map((CarouselItem) => {
                return (
                    CarouselItem.in_coursel &&
                    <Carousel.Item>
                        <div className='item-carousel'>
                            <div className='carousel-title t1'>
                                <div>
                                    <h1 className='heading'>{CarouselItem.title}</h1>
                                    <p className='cor-sec-p'>{CarouselItem.category}&nbsp;&nbsp;&nbsp;
                                        <span className='svg-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar4 carousel-icon" viewBox="0 0 16 16">
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                            </svg>&nbsp;
                                            {CarouselItem.year} &nbsp;
                                        </span>
                                        <span className='svg-icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch carousel-icon" viewBox="0 0 16 16">
                                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
                                            </svg>&nbsp;{CarouselItem.duration}
                                        </span>
                                    </p>
                                    <div className="rating-type">
                                        <Rating className='cor-sec-p' rating={CarouselItem.star_rating} size={"12"} ></Rating>
                                        <span className="type-rating">{CarouselItem.type_rating}</span>
                                    </div>
                                    <div className="carousel-btn-div">
                                        <button className='carousel-btn book-btn'>Book Tickets</button>
                                        <button className='carousel-btn'>Review</button>
                                        <button className='carousel-btn'>More</button>
                                    </div>
                                </div>
                            </div>
                            <div className='carousel-title t2'>
                                <p className='cor-sec-p para'>{CarouselItem.director}<span className="title-tag"> : Director</span></p>
                                <p className='cor-sec-p para'>{CarouselItem.actors}<span className="title-tag"> : Stars</span></p>
                                <p className='cor-sec-p para'>{CarouselItem.description}</p>
                            </div>
                            <img
                                className="d-block w-100"
                                src={CarouselItem.coursel_img}
                                alt="first slide"
                            />
                        </div>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    );
}
