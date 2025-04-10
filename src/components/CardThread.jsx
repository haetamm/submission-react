import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AvatarUser from './AvatarUser';
import { showFormattedDate } from '../utils/helper';
import '../styles/card-thread.css';
import { FaCommentDots } from 'react-icons/fa';
import { urlPage } from '../utils/constans';
import ButtonVote from './ButtonVote';

const CardThread = ({
  id, category, owner, title, createdAt, body, upVotesBy, downVotesBy, totalComments, comments, content, upVote, downVote, neutralVote
}) => {

  const showButtonComment = () => {
    return totalComments >= 0 || (comments && comments.length >= 0);
  };

  return (
    <>
      <div className="thread-container">
        <div className="thread-header">
          <div className="thread-header__wrap">
            <AvatarUser img={owner.avatar} />
            <div className="user-info">
              <div className="name">
                <span>{owner.name}</span>
              </div>
              <span className="handle">{showFormattedDate(createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="wrap-thread-content">
          <div className="thread-content">
            {title &&
            <Link to={`${urlPage.THREAD}/${id}`} className="thread-title">
              {title}
            </Link>
            }
            <div
              className=" thread-body"
              dangerouslySetInnerHTML={{
                __html: body || content,
              }}
            />
            {category &&
              <div className='thread-category'>
                <Link to={`${urlPage.SEARCH}?category=${encodeURIComponent(category)}`} className='thread-category'>
                #{category}
                </Link>
              </div>
            }
          </div>
        </div>
        <div
          className={`${showButtonComment() ? 'flex justify-beetween' : 'inline'} thread-actions `}>
          <div className="wrap-icon-button" >
            <ButtonVote
              votes={downVotesBy}
              type="dislike"
              downVote={downVote}
              neutralVote={neutralVote}
            />

            <ButtonVote
              votes={upVotesBy}
              type="like"
              upVote={upVote}
              neutralVote={neutralVote}
            />

          </div>
          {showButtonComment() && (
            <Link to={`${urlPage.THREAD}/${id}`} className="wrap-icon">
              <FaCommentDots className="icon cursor-pointer" />
              <p>{totalComments || comments?.length}</p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

CardThread.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  comments: PropTypes.array,
  content: PropTypes.string,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired
};

export default CardThread;
