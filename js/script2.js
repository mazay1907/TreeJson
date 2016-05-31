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
};
Item.prototype.draw = function() {
    var li = document.createElement("li");
    li.innerHTML = this.key + " : " + this.value;
    li.id = this.key;
    return li;
};// <li> item </li>

function Node () {
    this.children = [];
    //return this.children;
}
Node.prototype.nodeName = function (name) {
    this.name = name;
    return this.name;
};

Node.prototype.nodeNameDraw = function () {
    var liName = document.createElement("li");
    var ulChild = document.createElement("ul");
    liName.innerHTML = "<strong>" + this.name + "</strong>";
    liName.appendChild(ulChild);
    return liName; // <li> name of node </li>
};

Node.prototype.addChild = function(child){
    this.children.push(child);
};
Node.prototype.drawItems = function(){
    for(var l=0; l < this.children.length; l++){
        var liChild = document.createElement("li");
        liChild.innerHTML = "<strong>" + this.children[l].key + "</strong>" + " : " + this.children[l].value;
        liChild.id = this.children[l].key;
        ulChild.appendChild(liChild); //<ul><li>item</li><li>item</li></ul>
    }
    return liName;
};
/*<li> item </li>
 <li> name of node
 <ul><li>item</li><li>item</li></ul>
 </li>*/

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
        "_type5": {
            "se1x5":{"_name": {"_1_name": "_1_jsonfile",
                "_1_version": "_1_2.3.1"},
                "_version": "_2.3.1"},
            "ag1e5": {"_author": "_JP Richardson <jprichardson@gmail.com>",
                "_license": "_MIT"}
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
//1. there is worked version
var arrayWithParsedJson = walk(parseJson);
function walk (objectForParse) {
    var array = [];
    for (var key in objectForParse) {
        if (typeof objectForParse[key] === "object") {
            var resultOfRecurtion = walk(objectForParse[key]);
            //console.log(resultOfRecurtion);
            var arrayLoop = [];
            for (var a = 0; a < resultOfRecurtion.length; a++) {
                arrayLoop.push("<ul>" + resultOfRecurtion[a] + "</ul>");
            }
            array.push("<li>" + key + arrayLoop.join("") + "</li>")
        } else {
            array.push("<li>" +  key + " ::: " + objectForParse[key] + "</li>");
        }

    }
    return array;
}
var body = document.body;
for (var a = 0; a < arrayWithParsedJson.length; a++) {
    body.innerHTML += arrayWithParsedJson[a];
}
console.log(arrayWithParsedJson);


/*
var foundUl = document.getElementsByTagName("ul")[0];
for (var a = 0; a < arrayWithParsedJson.length; a++) {
    var ul = document.createElement("ul");
    ul.innerHTML = arrayWithParsedJson[a];
    foundUl.appendChild(ul);
}
console.log(arrayWithParsedJson);
*/

//2. New
/*
var arrayWithParsedJson = walk(parseJson);
var nodeMain = new Node();
function walk (objectForParse) {
    var array = [];
    for (var key in objectForParse) {
        var item = new Item();
        if (typeof objectForParse[key] === "object") {
            var node = new Node;
            var recursObject = walk(objectForParse[key]);
            console.log(recursObject);
            for (var a = 0; a < recursObject.length; a++){
                //console.log(recursObject[a]);
                //node.nodeName(key);
                //item.addValue
                array.push(key + " - " + recursObject[a]);
            }


        } else {
            array.push(item.addValue(key, objectForParse[key]));
            //Elarray.push(item.draw());

        }

    }
    return array;
*/
    //return nodeMain;
//}
var foundUl = document.getElementsByTagName("ul")[0];
/*for (var a = 0; a < arrayWithParsedJson.length; a++) {
    var ul = document.createElement("ul");
    //ul.innerHTML = arrayWithParsedJson[a];
    //console.log(arrayWithParsedJson[a]);
    ul.appendChild(arrayWithParsedJson[a]);
    foundUl.appendChild(ul)
}*/

console.log(arrayWithParsedJson);
//console.log(tree.data);
