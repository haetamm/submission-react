import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transformThreadsWithOwners } from '../utils/helper';
import CardThread from '../components/CardThread';
import { asyncPopulateUsersAndThreads } from '../stores/shared/action';
import useLanguage from '../hooks/useLanguage';
import { translatedNames } from '../utils/lang';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../stores/thread/action';
import usePermission from '../hooks/usePermission';

const HomePage = () => {
  const dispatch = useDispatch();
  const language = useLanguage();
  const { loading } = useSelector((state) => state.shared);
  const { threads } = useSelector((state) => state.threads);
  const { users } = useSelector((state) => state.users);
  const { authUser } = usePermission();
  const userId = authUser?.id || '';

  const threadsWithOwners = transformThreadsWithOwners(threads, users);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  return (
    <>
      <title>Home / XClone</title>
      <meta name="description" content="Home Page" />
      <div className="list-thread mb-10">
        {loading ? (
          <div className="wrap-loading">
            <div className="loading" />
          </div>
        ) : threadsWithOwners && threadsWithOwners.length > 0 ? (
          threadsWithOwners.map((thread) => (
            <CardThread
              key={thread.id}
              {...thread}
              upVote={asyncUpVoteThread(thread.id, userId)}
              downVote={asyncDownVoteThread(thread.id, userId)}
              neutralVote={asyncNeutralVoteThread(thread.id, userId)}
            />
          ))
        ) : (
          <div className="not-found">
            {translatedNames[language]['Tidak Ditemukan']}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
