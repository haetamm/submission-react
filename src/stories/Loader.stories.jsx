import React from 'react';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';
import '../styles/index.css';
const story = {
  title: 'Loader',
  component: Loader,
};

export default story;

// Template untuk merender Loader
const TemplateStory = (args) => <Loader {...args} />;

const Default = TemplateStory.bind({});
Default.args = {
  size: '50px',
  borderColor: '#2196f3',
  sideBorderColor: '#fff',
};

const Small = TemplateStory.bind({});
Small.args = {
  size: '30px',
  borderColor: '#2196f3',
  sideBorderColor: '#fff',
  borderWidth: '4px',
};

const Large = TemplateStory.bind({});
Large.args = {
  size: '80px',
  borderColor: '#2196f3',
  sideBorderColor: '#fff',
  borderWidth: '8px',
};

const RedTopBorder = TemplateStory.bind({});
RedTopBorder.args = {
  size: '50px',
  borderColor: '#f44336', // Border atas merah
  sideBorderColor: '#fff',
  borderWidth: '6px',
};

const GreenTopBorder = TemplateStory.bind({});
GreenTopBorder.args = {
  size: '50px',
  borderColor: '#4caf50', // Border atas hijau
  sideBorderColor: '#fff',
  borderWidth: '6px',
};

const GraySideBorder = TemplateStory.bind({});
GraySideBorder.args = {
  size: '50px',
  borderColor: '#2196f3',
  sideBorderColor: '#ccc',
  borderWidth: '6px',
};

const BlackSideBorder = TemplateStory.bind({});
BlackSideBorder.args = {
  size: '50px',
  borderColor: '#2196f3',
  sideBorderColor: '#000',
  borderWidth: '6px',
};

const ThinBorder = TemplateStory.bind({});
ThinBorder.args = {
  size: '50px',
  borderColor: '#2196f3',
  sideBorderColor: '#fff',
  borderWidth: '3px',
};

const ThickBorder = TemplateStory.bind({});
ThickBorder.args = {
  size: '50px',
  borderColor: '#2196f3',
  sideBorderColor: '#fff',
  borderWidth: '10px',
};

export {
  Default,
  Small,
  Large,
  RedTopBorder,
  GreenTopBorder,
  GraySideBorder,
  BlackSideBorder,
  ThinBorder,
  ThickBorder,
};

// Dokumentasi PropTypes untuk Storybook
Loader.propTypes = {
  /** Ukuran loader (lebar dan tinggi dalam px atau unit lain) */
  size: PropTypes.string,
  /** Warna border atas loader (bisa warna hex, rgb, atau variabel CSS) */
  borderColor: PropTypes.string,
  /** Warna border samping dan bawah loader (bisa warna hex, rgb, atau variabel CSS) */
  sideBorderColor: PropTypes.string,
  /** Ketebalan border loader (dalam px atau unit lain) */
  borderWidth: PropTypes.string,
};