
import { DirectoryPicker } from './directoryPicker';
import { YouTubeVideoForm } from './urlInput';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dbSlices } from "../infrastructure/database/constants";
import { DatabaseSliceCallers } from "../infrastructure/database/callers";

const downloadPathCallers = new DatabaseSliceCallers(dbSlices.DOWNLOAD_PATH).getCallers();



const Content = () => {
  const dispatch = useDispatch();

  const [downloadPath, setDownloadPath] = useState([]);

  useEffect(() => {
    downloadPathCallers.find({}).then((res: any) => {
      setDownloadPath(res);
    });
  }, []);



  const handleInsert = async () => {
    const downloadPath = '/hi/there';
    await downloadPathCallers.insert({ content: downloadPath });

    // Re-fetch documents after insertion
    const updatedDownloadPath = await downloadPathCallers.find({})
    setDownloadPath(updatedDownloadPath);
  };


  return (
    <div>
      <DirectoryPicker />

      <YouTubeVideoForm />

      <button onClick={() => handleInsert()}>Add Data</button>

      <ul>
        {downloadPath.map((path: any, index: number) => {
          return path.content && <li key={index}>{path.content}</li>
        })}
      </ul>

    </div>
  );
};

export default Content;
