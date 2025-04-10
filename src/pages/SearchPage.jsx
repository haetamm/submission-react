import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../stores/shared/action';
import CardThread from '../components/CardThread';
import { translatedNames } from '../utils/lang';
import useLanguage from '../hooks/useLanguage';
import { filterThreadByCategory, filterThreadByTitle, transformThreadsWithOwners } from '../utils/helper';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../stores/thread/action';
import usePermission from '../hooks/usePermission';
import CategoryList from '../components/CategoryList';

const SearchPage = () => {
  const dispatch = useDispatch();
  const language = useLanguage();
  const [searchParams] = useSearchParams();
  const { loading } = useSelector((state) => state.shared);
  const { threads } = useSelector((state) => state.threads);
  const { users } = useSelector((state) => state.users);
  const [categories, setCategories] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const titleQuery = searchParams.get('title') || '';
  const categoryQuery = searchParams.get('category') || '';
  const { authUser } = usePermission();
  const userId = authUser?.id || '';

  useEffect(() => {
    if (!threads?.length || !users?.length) {
      dispatch(asyncPopulateUsersAndThreads());
      return;
    }
    const uniqueCategories = [...new Set(threads.map((thread) => thread.category))];
    setCategories(uniqueCategories);

    const threadsWithOwners = transformThreadsWithOwners(threads, users);
    let result = threadsWithOwners;
    if (titleQuery) {
      result = filterThreadByTitle(result, titleQuery);
    }
    if (categoryQuery) {
      result = filterThreadByCategory(result, categoryQuery);
    }
    setFilteredThreads(result);
  }, [dispatch, titleQuery, categoryQuery, threads, users]);

  return (
    <>
      <title>Search / XClone</title>
      <meta name="description" content="Search Page" />
      <div className="list-thread mb-10">
        {titleQuery && (
          <h3>
            {translatedNames[language]['Hasil']} title: {titleQuery}
          </h3>
        )}
        {categoryQuery && !titleQuery && (
          <h3>
            {translatedNames[language]['Hasil']} category: {categoryQuery}
          </h3>
        )}
        {!titleQuery && !categoryQuery ? (
          <CategoryList
            translatedNames={translatedNames}
            language={language}
            categories={categories}
            threads={threads}
          />
        ) : loading ? (
          <div className="wrap-loading">
            <div className="loading" />
          </div>
        ) : filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <CardThread
              key={thread.id}
              {...thread}
              upVote={() => dispatch(asyncUpVoteThread(thread.id, userId))}
              downVote={() => dispatch(asyncDownVoteThread(thread.id, userId))}
              neutralVote={() => dispatch(asyncNeutralVoteThread(thread.id, userId))}
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

export default SearchPage;