/**
 * Created by mazay1907 on 5/18/2016.
 */
// Start of parsing
var jsonFile = new XMLHttpRequest(),
    linkToJson = "generated1.json";

jsonFile.open("GET", linkToJson);
jsonFile.send(null);

jsonFile.onload = function () {
    var responseJson = jsonFile.responseText;

    var parseJson = JSON.parse(responseJson);
    var node = new Node();
    node.checkTheValueIsObject(parseJson);
    node.printInDocument(document.body);
    //console.log(node.children);


};
// create items
function Item() {
}
Item.prototype.addValue = function (key, value) {
    this.key = key;
    this.value = value;
    return this.key + " : " + this.value;
};
Item.prototype.drawLiElement = function () {
    var li = document.createElement("li");
    li.innerHTML = this.key + " : " + this.value;
    return li;
};


function Node() {
    this.children = [];
}

Node.prototype.checkTheValueIsObject = function (objectForParse) {
    this.object = objectForParse;
    for (var key in objectForParse) {
        if (typeof objectForParse[key] === "object") {
            var nodeParent = new Node();
            nodeParent.nameOfNode(key);
            nodeParent.checkTheValueIsObject(objectForParse[key]);
            this.children.push(nodeParent.drawLiNameParent());
        }
        else {
            var item = new Item();
            item.addValue(key, objectForParse[key]);
            this.children.push(item.drawLiElement());
        }
    }
};
Node.prototype.nameOfNode = function (name) {
    this.name = name;
    return this.name;
};

// create the Node element as <li>name of node<ul><li>item</li></ul></li>
Node.prototype.drawLiNameParent = function () {
    var liName = document.createElement("li"),
        divPlusMinus = document.createElement("div");
    divPlusMinus.className = "drop";
    divPlusMinus.style = "background-position: 0px 0px;";
    //console.log(liName);
    liName.innerHTML = this.name;
    liName.appendChild(this.drawUlElement());
    liName.insertBefore(divPlusMinus, liName.firstChild);
    return liName;
};
Node.prototype.drawUlElement = function () {
    var ul = document.createElement("ul");
    for (var a = 0; a < this.children.length; a++) {
        ul.appendChild(this.children[a]);
    }
    return ul;
};
// add from Node array to the document
Node.prototype.printInDocument = function (element) {
    var body = element;
    var ulMain = document.createElement("ul");
    ulMain.className = "ul-tree ul-drop";
    for (var a = 0; a < this.children.length; a++) {
        ulMain.appendChild(this.children[a]);
    }
    body.appendChild(ulMain);
    new showHideList("ul-tree ul-drop");
};

function showHideList(elem) {
    var ulMain = document.getElementsByClassName(elem)[0];
    ulMain.onclick = function (event) {
        var target = event.target;
        if (target.tagName != "DIV") {
            return;
        }
        var li = target.parentNode;
        var ulChildren = li.getElementsByTagName("ul")[0];
        if (!ulChildren) {
            return;
        }
        ulChildren.classList.toggle("hidden");
    };
}



