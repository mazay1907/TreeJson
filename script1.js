/**
 * Created by mazay1907 on 5/18/2016.
 */
function Tree () {
    this.data = []
}

Tree.prototype.addData = function(data){
    this.data.push(data)
};
Tree.prototype.draw = function(){
    // draw <ul>
    for(var l in this.data){
        l.draw();
    }
    // draw </ul>
};

function Item () {}
Item.prototype.addValue = function (key, value) {
    this.key = key;
    this.value = value;
    return this.key + " : " + this.value;
    //return "<li>" + this.key + " : " + this.value + "</li>";

};
Item.prototype.draw = function() {
    var li = document.createElement("li");
    li.innerHTML = this.key + " : " + this.value;
    li.id = this.key;
    return li;
};

function Node () {
    this.children = [];
}
Node.prototype.nodeName = function (name) {
    this.name = name;
};
Node.prototype.addChild = function(child){
    this.children.push(child);
};
Node.prototype.draw = function(){
    var ulChild = document.createElement("ul"),
        liName = document.createElement("li");
    liName.innerHTML = "<strong>" + this.name + "</strong>";
    for(var l=0; l < this.children.length; l++){
        var liChild = document.createElement("li");
        liChild.innerHTML = "<strong>" + this.children[l].key + "</strong>" + " : " + this.children[l].value;
        liChild.id = this.children[l].key;
        ulChild.appendChild(liChild);

    }
    liName.appendChild(ulChild);
    return liName;
};
/*Node.prototype.draw = function(){
    var ulParent = document.createElement("ul"),
        ulChild = document.createElement("ul"),
        liName = document.createElement("li");
    liName.innerHTML = "<strong>" + this.name + "</strong>";
    for(var l=0; l < this.children.length; l++){
        //console.log(this.children[l].key);
        //var liChild = Item.prototype.draw;
        var liChild = document.createElement("li");
        liChild.innerHTML = "<strong>" + this.children[l].key + "</strong>" + " : " + this.children[l].value;
        liChild.id = this.children[l].key;
        ulChild.appendChild(liChild);

    }
    liName.appendChild(ulChild);
    ulParent.appendChild(liName);
    return ulParent;
};*/




// Start of parsing
var parseJson = {
    "name": "jsonfile",
    "version": "2.3.1",
    "description": "Easily read/write JSON files.",
    "repository": {
        "type": {
            "se1x":"me1n",
            "ag1e": "515"
        },
        "url": "git@github.com:jprichardson/node-jsonfile.git"
    },
    "author": "JP Richardson <jprichardson@gmail.com>",
    "license": "MIT",
    "dependencies": {
        "value": "six",
        //"animal": "22"
        "animal" :{
         "sex":"men",
         "age": {
             "se3x":"me3n",
             "ag3e": "535"
         }
         }
    }
    };

var idOfParent = "body";
checkJson(parseJson, idOfParent);

function checkJson (parseJsonObject, parLoc) {
    this.ulMain = document.createElement("ul");
    var parentEl = document.getElementById(parLoc);
    this.object = parseJsonObject;
    for (var i in this.object) {
        if (typeof this.object[i] == "string") {
            var item = new Item();
            item.addValue(i, this.object[i]);
            this.ulMain.appendChild(item.draw());
        }
        else if (typeof this.object[i] == "object") {
            var node = new Node();
            var o = this.object[i];
            for (var y in o) {
                var item = new Item();
                if (typeof o[y] != "object") {
                    item.addValue(y, o[y]);
                    node.nodeName(i);
                    node.addChild(item);
                }
                else if (typeof o[y] == "object") {

                    item.addValue(y, "");
                        node.nodeName(y);
                        node.addChild(item);
                }
            }
            this.ulMain.appendChild(node.draw());
        }
    }
    parentEl.appendChild(this.ulMain);
        checkJson(o[y], y);

}

