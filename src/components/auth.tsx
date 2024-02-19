import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/auth/authSlice";
import { useGoogleLogin } from '@react-oauth/google';
import { dbSlices } from "../infrastructure/database/constants";
import { DatabaseSliceCallers } from "../infrastructure/database/callers";

const downloadPathCallers = new DatabaseSliceCallers(dbSlices.DOWNLOAD_PATH).getCallers();

export const Auth = () => {
  const dispatch = useDispatch();

  const [downloadPath, setDownloadPath] = useState([]);

  useEffect(() => {
    downloadPathCallers['find']({}).then((res: any) => {
      console.log(res);
      setDownloadPath(res);
    });

    //const fetchDocuments = async () => {
    //  const docs = await window.api.fetchDocuments();
    //  setDownloadPath(docs);
    //};

  }, []);

  const handleInsert = async () => {
    const downloadPath = '/hi/there';
    await downloadPathCallers['insert']({ content: downloadPath });

    // Re-fetch documents after insertion
    const updatedDownloadPath = await downloadPathCallers['find']({})
    console.log(updatedDownloadPath);
    setDownloadPath(updatedDownloadPath);
  };


  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      dispatch(setAuthToken(tokenResponse.access_token));
    },
  });

  return (
    <div>
      <button onClick={() => login()}>Login</button>

      <button onClick={() => handleInsert()}>Add Data</button>

      <ul>
        {downloadPath}
      </ul>
    </div>
  );
}
