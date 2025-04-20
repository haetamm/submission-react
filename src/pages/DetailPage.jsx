import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../stores/threadDetail/action';
import { useParams } from 'react-router-dom';
import CardThread from '../components/CardThread';
import usePermission from '../hooks/usePermission';
import FormComment from '../components/FormComment';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../stores/thread/action';
import { asyncDownVoteComment, asyncNeutralVoteComment, asyncUpVoteComment } from '../stores/comment/action';

const DetailPage = () => {
  const { id } = useParams();
  const { threadDetail, loading } = useSelector((state) => state.threadDetail);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const { isAuthenticated, authUser } = usePermission();
  const userId = authUser?.id || '';

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <title>Thread Detail / XClone</title>
      <meta name="description" content="Detail Page" />
      <div className="list-thread mb-10">
        { loading ? (
          <div className="wrap-loading">
            <div className="loading" />
          </div>
        ) : threadDetail ? (
          <>
            <CardThread
              {...threadDetail}
              upVote={asyncUpVoteThread(threadDetail.id, userId)}
              downVote={asyncDownVoteThread(threadDetail.id, userId)}
              neutralVote={asyncNeutralVoteThread(threadDetail.id, userId)}
            />
            {isAuthenticated && <FormComment  {...threadDetail} />}
            {comments.length ?
              comments.map((comment) => (
                <CardThread
                  key={comment.id}
                  {...comment}
                  upVote={asyncUpVoteComment(threadDetail.id, comment.id, userId)}
                  downVote={asyncDownVoteComment(threadDetail.id, comment.id, userId)}
                  neutralVote={asyncNeutralVoteComment(threadDetail.id, comment.id, userId)}
                />
              )) : (
                null
              )
            }
          </>
        )
          : (
            <div className="not-found">Not Found</div>
          )}
      </div>
    </>
  );
};

export default DetailPage;