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
    return "<li>" + this.key + " : " + this.value + "</li>";
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
    var ulParent = document.createElement("ul"),
        ulChild = document.createElement("ul"),
        liName = document.createElement("li");
    liName.innerHTML = "<strong>" + this.name + "</strong>";
    for(var l=0; l<this.children.length; l++){
        console.log(this.children[l].key);
        var liChild = document.createElement("li");
        liChild.innerHTML = "<strong>" + this.children[l].key + "</strong>" + " : " + this.children[l].value;
        ulChild.appendChild(liChild);

    }
    liName.appendChild(ulChild);
    ulParent.appendChild(liName);
    return ulParent.innerHTML;
};




// Start of parsing
var parseJson = {
    "name": "jsonfile",
    "version": "2.3.1",
    "description": "Easily read/write JSON files.",
    "repository": {
        "type": "git",
        "url": "git@github.com:jprichardson/node-jsonfile.git"
    },
    "author": "JP Richardson <jprichardson@gmail.com>",
    "license": "MIT",
    "dependencies": {
        "value": "six",
        //"animal": "22"
        "animal" :{
         "sex":"men",
         "age": "55"
         }
    }
    };

var tree = new Tree();
checkJson(parseJson);
function checkJson (parseJsonObject) {
    this.object = parseJsonObject;
    for (var i in this.object) {
        if (typeof this.object[i] == "string") {
            //this.object[i] = this[i];
            var item = new Item();
            item.addValue(i, this.object[i]);
            item.draw();
            //console.log("item is   " + item.draw());

            tree.addData(item);
        }
        else if (typeof this.object[i] == "object") {
            var node = new Node();
            var o = this.object[i];
            for (var y in o) {
                var item = new Item();
                item.addValue(y, o[y]);
                node.nodeName(i);
                node.addChild(item);
                console.log("node is   " + node.draw());

                if (typeof o[y] == "object") {
                    //console.log(o[y]);
                    checkJson(o[y]);
                }
            }
            tree.addData(node)
        }
    }

}





console.log(tree.data);





