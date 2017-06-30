  function saveToDB(title, description, id, link){
    var http = new XMLHttpRequest();
    var url = "/api/image";
    var params= {
      "title": title,
      "description": description,
      "id" : id,
      "link" : link
    }

    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(params));
  }

  Dropzone.options.myId = {
    init: function() {
      this.on("success", function(file, res) {
        console.log(file);
        saveToDB(res.data.id, res.data.link);
      });

      this.on("reset", function(){
        hide_link();
      });
    },
    paramName: "image",
    url : "https://api.imgur.com/3/upload",
    addRemoveLinks: true,
    headers: { "Authorization" : "Client-ID 3d0295885297563",  "Cache-Control": null, "X-Requested-With": null} 
  };


document.addEventListener("DOMContentLoaded", function(event) { 
  //get images
  //init dropzone
});
