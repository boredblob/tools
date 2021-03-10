import './App.css';
import { Button, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { purple, orange} from "@material-ui/core/colors"
import { useState, useEffect } from "react";
import parseAPNG, { isNotAPNG } from "apng-js";

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
      primary: "#ffffff"
    }
  }
});

function App() {
  const [currentFile, setCurrentFile] = useState(null);
  const [parsedFile, setParsedFile] = useState(null);
  useEffect(() => {
    console.log(currentFile);
    if (!isNotAPNG(currentFile)) {
      console.log(parseAPNG(currentFile));
      setParsedFile(parseAPNG(currentFile));
    }
  }, [currentFile])
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
      
      <List>{fillList(parsedFile)}</List>
    </ThemeProvider>
  );
}

function fillList(parsedFile) {
  console.log((parsedFile == null));
  if (parsedFile == null) return;
  const listArray = [];
  for (let i = 0; i < parsedFile.frames.length; i++) {
    listArray.push(
      <ListItem>
        <ListItemAvatar>
          <img src="" alt=""></img>
        </ListItemAvatar>
        <ListItemText primary={`Frame ${i+1}`} />
      </ListItem>
    )
  }
  return listArray;
}

export default App;