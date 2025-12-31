import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getASingleReviewByIdAction } from '../features/review/reviewAction';
import { Col, Container, Row } from 'react-bootstrap';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ReviewLandingPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const {productReview} = useSelector((state)=> state.reviewInfo)

    useEffect(()=>{
        dispatch(getASingleReviewByIdAction(id))
    },[dispatch, id])

      const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    const first = parts?.[0]?.[0]?.toUpperCase() || "";
    const second = parts?.[1]?.[0]?.toUpperCase() || "";
    return first + second;
  };

  const renderStars = (rating) => {
    return (
      <span className="stars">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </span>
    );
  };
  return (
    <>
    <div>
        <div className='p-4'>
            <div>
                <Link to="/admin/reviews">
                <IoArrowBackCircleOutline size={50}/>
                </Link>
                </div>
            <h3 className='text-center'>Reviews</h3>
        </div>
     <Container fluid className="review-container">
  <div className="review-inner">
    <div className="review-wrapper">
      {productReview?.length ? (
        productReview.map((review, i) => (
          <Row className="review-card shadow-sm" key={i}>
            <Col>
              <div className="review-content">
                <div className="review-profile">
                  {getInitials(review.userName)}
                </div>

                <div className="review-body">
                  <div className="review-header">
                    <div>
                      <h5 className="review-name">{review.userName}</h5>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    <span className="review-date">
                      {new Date(review.createdAt).toDateString()}
                    </span>
                  </div>

                  <p className="review-message">
                    {review.reviewMessage}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        ))
      ) : (
        <p className="text-muted text-center">No reviews yet</p>
      )}
    </div>
  </div>
</Container>


    </div>
    </>
  )
}

export default ReviewLandingPage