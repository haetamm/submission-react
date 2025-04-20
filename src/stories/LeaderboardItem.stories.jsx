import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from '../components/LeaderboardItem';

const story = {
  title: 'LeaderboardItem',
  component: LeaderboardItem,
  argTypes: {
    gradientType: {
      control: { type: 'select', options: ['default', 'first', 'blue', 'green'] },
    },
    customGradient: {
      control: { type: 'text' },
    },
  },
};

export default story;

const TemplateStory = (args) => <LeaderboardItem {...args} />;

const Default = TemplateStory.bind({});
Default.args = {
  rank: 2,
  user: {
    avatar: 'https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg',
    name: 'John Doe',
  },
  score: 150,
  isFirstPlace: false,
  gradientType: 'default',
};

const FirstPlace = TemplateStory.bind({});
FirstPlace.args = {
  rank: 1,
  user: {
    avatar: 'https://ui-avatars.com/api/?name=Jane Smith&background=random',
    name: 'Jane Smith',
  },
  score: 300,
  isFirstPlace: true,
  gradientType: 'first',
};

const BlueGradient = TemplateStory.bind({});
BlueGradient.args = {
  rank: 3,
  user: {
    avatar: 'https://ui-avatars.com/api/?name=Alice Johnson&background=random',
    name: 'Alice Johnson',
  },
  score: 120,
  isFirstPlace: false,
  gradientType: 'blue',
};

const GreenGradient = TemplateStory.bind({});
GreenGradient.args = {
  rank: 4,
  user: {
    avatar: 'https://ui-avatars.com/api/?name=Bob Wilson&background=random',
    name: 'Bob Wilson',
  },
  score: 100,
  isFirstPlace: false,
  gradientType: 'green',
};

const CustomRedGradient = TemplateStory.bind({});
CustomRedGradient.args = {
  rank: 5,
  user: {
    avatar: 'https://ui-avatars.com/api/?name=Custom User&background=random',
    name: 'Custom User',
  },
  score: 80,
  isFirstPlace: false,
  customGradient: 'linear-gradient(90deg, #ff0000, #ff9999)',
};

const CustomPurpleGradient = TemplateStory.bind({});
CustomPurpleGradient.args = {
  rank: 6,
  user: {
    avatar: 'https://ui-avatars.com/api/?name=Purple User&background=random',
    name: 'Purple User',
  },
  score: 70,
  isFirstPlace: false,
  customGradient: 'linear-gradient(45deg, #800080, #dda0dd)', // Gradient ungu
};

export {
  Default,
  FirstPlace,
  BlueGradient,
  GreenGradient,
  CustomRedGradient,
  CustomPurpleGradient,
};

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  isFirstPlace: PropTypes.bool,
  gradientType: PropTypes.oneOf(['default', 'first', 'blue', 'green']),
  customGradient: PropTypes.string,
  rankCircleColor: PropTypes.string,
  scoreColor: PropTypes.string,
  userNameColor: PropTypes.string,
};