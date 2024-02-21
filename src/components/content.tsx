import React from 'react';
import { DirectoryPicker } from './directoryPicker';
import { YouTubeVideoForm } from './urlInput';

const Content = () => {
  return (
    <div>
      <DirectoryPicker />

      <YouTubeVideoForm />
    </div>
  );
};

export default Content;
