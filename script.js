// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBnLmymnXf2JieOyeDGtjzjmz9kOxwwOx4",
    authDomain: "collaborative-code-edito-83579.firebaseapp.com",
    databaseURL: "https://collaborative-code-edito-83579-default-rtdb.firebaseio.com",
    projectId: "collaborative-code-edito-83579",
    storageBucket: "collaborative-code-edito-83579.appspot.com",
    messagingSenderId: "554811163038",
    appId: "1:554811163038:web:c254b89336b05c4fad168f",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Initialize CodeMirror
  const editor = CodeMirror(document.getElementById('editor'), {
    lineNumbers: true,
    mode: "javascript"
  });
  
  // Listen for changes in Firestore and update editor
  db.collection('documents').doc('code').onSnapshot(doc => {
    const code = doc.data().content;
    if (code !== editor.getValue()) {
      editor.setValue(code);
    }
  });
  
  // Listen for changes in editor and update Firestore
  editor.on('change', (instance, changeObj) => {
    const content = instance.getValue();
    db.collection('documents').doc('code').set({ content });
  });
  