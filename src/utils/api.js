import axios from 'axios';
import Cookies from 'js-cookie';
import { urlPage } from './constans';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = (() => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        const token = Cookies.get('token');
        if (token) {
          window.location.assign(urlPage.LOGIN);
        }
        Cookies.remove('token');
      }
      return Promise.reject(error);
    }
  );

  const putAccessToken = (token) => {
    Cookies.set('token', token, { expires: 7 });
  };

  const removeAccessToken = () => {
    Cookies.remove('token');
  };

  const getAccessToken = () => {
    return Cookies.get('token');
  };

  const register = async ({ name, email, password }) => {
    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
      });
      console.log(response);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.token;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const getOwnProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.users;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const getAllThreads = async () => {
    try {
      const response = await axiosInstance.get('/threads');
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.threads;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const getThreadDetail = async (id) => {
    try {
      const response = await axiosInstance.get(`/threads/${id}`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.detailThread;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const createThread = async ({ title, body, category }) => {
    try {
      const response = await axiosInstance.post('/threads', {
        title,
        body,
        category
      });
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.thread;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const createComment = async ({ content }, id) => {
    try {
      const response = await axiosInstance.post(`/threads/${id}/comments`, {
        content,
      });
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.comment;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const upVoteThread = async (id) => {
    try {
      const response = await axiosInstance.post(`/threads/${id}/up-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const downVoteThread = async (id) => {
    try {
      const response = await axiosInstance.post(`/threads/${id}/down-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const neutralVoteThread = async (id) => {
    try {
      const response = await axiosInstance.post(`/threads/${id}/neutral-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const upVoteComment = async (threadId, commentId) => {
    try {
      const response = await axiosInstance.post(`threads/${threadId}/comments/${commentId}/up-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const downVoteComment = async (threadId, commentId) => {
    try {
      const response = await axiosInstance.post(`/threads/${threadId}/comments/${commentId}/down-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const neutralVoteComment = async (threadId, commentId)  => {
    try {
      const response = await axiosInstance.post(`/threads/${threadId}/comments/${commentId}/neutral-vote`);
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.vote;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const getLeaderboards = async () => {
    try {
      const response = await axiosInstance.get('/leaderboards');
      const { status, message, data } = response.data;

      if (status !== 'success') {
        throw new Error(message);
      }

      return data.leaderboards;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
    removeAccessToken
  };
})();

export default api;