import React from 'react';
import PropTypes from 'prop-types';
import AvatarUser from '../components/AvatarUser';

const story = {
  title: 'AvatarUser',
  component: AvatarUser,
};

export default story;

const TemplateStory = (args) => <AvatarUser {...args} />;

const Default = TemplateStory.bind({});
Default.args = {
  img: 'https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg',
  size: '40px',
  borderRadius: '100%',
};

const Large = TemplateStory.bind({});
Large.args = {
  img: 'https://ui-avatars.com/api/?name=Anton&background=random',
  size: '80px',
  borderRadius: '100%',
};

const Small = TemplateStory.bind({});
Small.args = {
  img: 'https://ui-avatars.com/api/?name=Anton&background=random',
  size: '24px',
  borderRadius: '100%',
};

const Square = TemplateStory.bind({});
Square.args = {
  img: 'https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg',
  size: '40px',
  borderRadius: '0%',
};

const SlightlyRounded = TemplateStory.bind({});
SlightlyRounded.args = {
  img: 'https://ui-avatars.com/api/?name=Anton&background=random',
  size: '40px',
  borderRadius: '10px',
};

const Fallback = TemplateStory.bind({});
Fallback.args = {
  img: '',
  size: '40px',
  borderRadius: '100%',
};

const MediumRounded = TemplateStory.bind({});
MediumRounded.args = {
  img: 'https://ui-avatars.com/api/?name=Anton&background=random',
  size: '60px',
  borderRadius: '20px',
};

export {
  Default,
  Large,
  Small,
  Square,
  SlightlyRounded,
  Fallback,
  MediumRounded,
};

AvatarUser.propTypes = {
  img: PropTypes.string,
  size: PropTypes.string,
  borderRadius: PropTypes.string,
};