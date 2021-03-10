import './App.css';
import ImageComponent from "./ImageComponent.js";
import { Button, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { purple, orange} from "@material-ui/core/colors"
import { useState, useEffect } from "react";
import parseAPNG, {isNotAPNG, isNotPNG } from "apng-js";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Helvetica",
  },
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: orange[500]
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff"
    }
  }
});

function App() {
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileBuffer, setCurrentFileBuffer] = useState(null);
  useEffect(() => {
    if (currentFile == null) return;
    async function getBuffer() {
      setCurrentFileBuffer(await currentFile.arrayBuffer());
    }
    getBuffer();
  }, [currentFile]);
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" component="label" color="primary">
        Upload
        <input onChange={e => setCurrentFile(e.target.files[0])}
          accept="image/png"
          type="file"
          hidden
        />
      </Button>
      <List>{fillList(currentFileBuffer)}</List>
      <List></List>
    </ThemeProvider>
  );
}

function fillList(buffer) {
  if (buffer == null) return;
  console.log(buffer);
  const apng = parseAPNG(buffer);
  if (apng instanceof Error) {
    if (isNotPNG(apng)) return;
    if (isNotAPNG(apng)) return;
  }
  const listArray = [];
  for (let i = 0; i < apng.frames.length; i++) {
    listArray.push(
      <ListItem key={i}>
        <ListItemAvatar>
          <ImageComponent frame={apng.frames[i]} width={apng.frames[0].width} height={apng.frames[0].height} />
        </ListItemAvatar>
        <ListItemText primary={`Frame ${i+1}`} secondary={`${apng.frames[i].delay}ms`} />
      </ListItem>
    );
  }
  return listArray;
}

export default App;