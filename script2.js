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
    liName.appendChild(ulChild);
    return liName;
};




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
//var tree = new Tree(),
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
            //console.log(this.object[i]);

            //return this.ulMain;
        }
        else if (typeof this.object[i] == "object") {
            console.log(this.object);
            console.log(this.object[i]);
            console.log(i);
            if (this.object[i]) {checkJson(this.object[i], i);}
            this.ulMain.appendChild(item.draw());
        }

    }
            /*var node = new Node();
            var o = this.object[i];
            //for (var y in o) {
                node.nodeName(i);
                item.addValue(y, o[y]);
                node.addChild(item);
                var item = new Item(checkJson(o[y], o));
                this.ulMain.appendChild(node.draw());*/
                // создать ноду
                // вызвать рекурсию
                // нарисовать все айтемы и если есть объекты - опять вызвать рекурсию
                // вернуться в основную ветку???
            //}
               /* if (typeof o[y] != "object") {
                    item.addValue(y, o[y]);
                    node.nodeName(i);
                    node.addChild(item);
                }
                else if (typeof o[y] == "object") {
                    item.addValue(y, "");
                    node.nodeName(y);
                    node.addChild(item);
                }*/

/*
///!*
//            //this.ulMain.appendChild(node.draw());
//!*!/
*/

    parentEl.appendChild(this.ulMain);
    }
