import React, { useEffect } from 'react';
import { FilePicker, Heading, TextInput } from 'evergreen-ui';
import { Button, Pane, Text, majorScale } from 'evergreen-ui'
import { Outlet } from 'react-router-dom';

export const HomeView = () => {
  return <>
    <Pane display="flex">
      <Heading size={900} marginTop={52}>
        YT Pal
      </Heading>
    </Pane>

    <Pane display="flex" marginTop={majorScale(4)}>
      <Button>Login</Button>
    </Pane>

    <Pane display="flex">
      <Outlet />
    </Pane>
  </>
}
