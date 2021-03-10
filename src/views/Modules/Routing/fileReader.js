var f = document.getElementById("file");
var fileList;
//var fs = document.getElementById("fs");
var customButton = document.getElementById("customBTN");
var customText = document.getElementById("customTXT");

customButton.addEventListener("click",function(e){
  f.click();
});

f.addEventListener("change",function(e){
  if (f.value){
    customTXT.innerHTML = f.value;
  }else{
    customTXT.innerHTML = "Nothing loaded yet";
  }
});




f.addEventListener('change', (event) => {
   fileList = event.target.files;
    console.log(fileList);
    getMetadataForFileList(fileList);
  });

  const dropArea = document.getElementById('DropArea');

  dropArea.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = 'copy';
  });

  dropArea.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    fileList = event.dataTransfer.files;
    console.log(fileList);
    getMetadataForFileList(fileList);
  });


  function getMetadataForFileList(data) {
    for (const file of fileList) {
      // Not supported in Safari for iOS.
      const name = file.name ? file.name : 'NOT SUPPORTED';
      // Not supported in Firefox for Android or Opera for Android.
      const type = file.type ? file.type : 'NOT SUPPORTED';
      // Unknown cross-browser support.
      const size = file.size ? file.size : 'NOT SUPPORTED';
      console.log({file, name, type, size});

      readFile(file);

    }
  }

  function readFile(file) {
  var reader = new FileReader();
  reader.addEventListener('load', (event) => {
    console.log(event.target.result);
    customTXT.innerHTML = file.name;
  });

  reader.addEventListener('progress', (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      console.log(`Progress: ${Math.round(percent)}`);
    }
  });
  reader.readAsText(file);
}
