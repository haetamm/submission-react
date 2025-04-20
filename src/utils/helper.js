const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-EN', options);
};

const isActive = (currentPrefix, targetPrefix) => {
  return currentPrefix === targetPrefix;
};


const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, '').trim();
};

const transformThreadsWithOwners = (threads, users) => {
  return threads.map((thread) => {
    const owner = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      owner: {
        id: thread.ownerId,
        name: owner ? owner.name : 'Unknown',
        avatar: owner ? owner.avatar : 'https://ui-avatars.com/api/?name=Unknown',
      },
    };
  });
};

const filterThreadByTitle = (thread, title) => {
  return thread.filter((thread) =>
    thread.title.toLowerCase().includes(title.toLowerCase())
  );
};

const filterThreadByCategory = (threads, category) => {
  return threads.filter(
    (thread) =>
      thread.category === category
  );
};

const handleTextareaChange = (event) => {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
};

const updateVotes = (threadOrComment, userId, voteType) => {
  let updatedUpVotesBy = Array.isArray(threadOrComment.upVotesBy)
    ? [...threadOrComment.upVotesBy]
    : [];
  let updatedDownVotesBy = Array.isArray(threadOrComment.downVotesBy)
    ? [...threadOrComment.downVotesBy]
    : [];

  if (voteType === 1) {
    if (!updatedUpVotesBy.includes(userId)) {
      updatedUpVotesBy.push(userId);
    }
    updatedDownVotesBy = updatedDownVotesBy.filter((id) => id !== userId);
  } else if (voteType === -1) {
    if (!updatedDownVotesBy.includes(userId)) {
      updatedDownVotesBy.push(userId);
    }
    updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
  } else if (voteType === 0) {
    updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
    updatedDownVotesBy = updatedDownVotesBy.filter((id) => id !== userId);
  }

  return {
    ...threadOrComment,
    upVotesBy: updatedUpVotesBy,
    downVotesBy: updatedDownVotesBy,
  };
};

export {
  showFormattedDate,
  isActive,
  stripHtml,
  transformThreadsWithOwners,
  handleTextareaChange,
  filterThreadByTitle,
  updateVotes,
  filterThreadByCategory,
};