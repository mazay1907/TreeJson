/**
 * Created by mazay1907 on 5/18/2016.
 */
// Start of parsing
var jsonFile = new XMLHttpRequest(),
    linkToJson = "generated.json",
    node = {},
    input = document.getElementById("search"),
    button = document.getElementById("button"),
    btnIsChecked = document.getElementById("checkboxSubmit");

jsonFile.open("GET", linkToJson);
jsonFile.send(null);
jsonFile.onload = function () {
    var responseJson = jsonFile.responseText;
    var parseJson = JSON.parse(responseJson);
    node = new Node();
    node.actionsToStartNodeProcess(parseJson, document.body);
};
// create items
function Item() {
    this.type = "item";
}
Item.prototype.addValue = function (key, value) {
    this.key = key;
    this.value = value;
    return this.key + " : " + this.value;
};
Item.prototype.checkValue =function(val) {
    if (val.getElementsByTagName("input")[0].checked == true) {
        node.checked.push(val.innerText);
    }
};
Item.prototype.drawLiElement = function () {
    var li = document.createElement("li"),
        input = document.createElement("input"),
        textElem = document.createTextNode(this.key + " : " + this.value);
    input.type = "checkbox";
    li.appendChild(input);
    li.appendChild(textElem);
    return li;
};
Item.prototype.searchAndShownHidden = function (searchText, itemElem) {
    var itemText = this.key + " : " + this.value;
    if (itemText.indexOf(searchText) != -1) {
        itemElem.className = "shown";
    }
    else {
        itemElem.className = "hidden";
    }
    chechAndChangeSibling(itemElem);
};

function chechAndChangeSibling(element) {
    var isSiblingShown = 0;
    for (var i = 0; i < element.parentNode.children.length; i++) {
        switch (element.parentNode.children[i].className) {
            case "":
                break;
            case "shown":
                isSiblingShown = 1;
                break;
            default:
                break;
        }
    }
    if (isSiblingShown == 1) {
        if (element.parentNode.className != "ul-tree ul-drop") {
            element.parentNode.className = "shown";
        }
        checkParentClass(element.parentNode);
        function checkParentClass (parentOfElement) {
            if (!parentOfElement.parentNode){
                return;
            }
            if (parentOfElement.parentNode.className != "ul-tree ul-drop") {
                parentOfElement.parentNode.className = "shown";
                checkParentClass(parentOfElement.parentNode);
            }
        }
    }
    else if (isSiblingShown == 0) {
        if (element.parentNode.className != "ul-tree ul-drop") {
            element.parentNode.className = "hidden";
            element.parentNode.parentNode.className = "hidden";
        }
    }
}

function Node() {
    this.type = "node";
    this.children = [];
    this.childNode = [];
    this.checked = [];
}
Node.prototype.actionsToStartNodeProcess = function(parseJson, position) {
    this.checkTheValueIsObject(parseJson);
    this.printInDocument(position);
};
Node.prototype.checkTheValueIsObject = function (objectForParse) {
    this.object = objectForParse;
    for (var key in objectForParse) {
        if (typeof objectForParse[key] === "object") {
            var nodeParent = new Node();
            nodeParent.nameOfNode(key);
            nodeParent.checkTheValueIsObject(objectForParse[key]);
            this.children.push(nodeParent.drawLiNameParent());
            this.childNode.push(nodeParent);
        }
        else {
            var item = new Item();
            item.addValue(key, objectForParse[key]);
            this.children.push(item.drawLiElement());
            this.childNode.push(item);
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
    showHideList(ulMain.className);
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
        var divIcon = ulChildren.parentNode.getElementsByTagName("div")[0];
                if (ulChildren.classList.value == "hidden"){
            ulChildren.className = "";
            divIcon.style = "";
        }
        else {
            ulChildren.className = "hidden";
            divIcon.style = "background-position: 0px 0px;";
        }
    };
}
Node.prototype.searchInTheChildNode = function (searchText) {
    if (!this.childNode) {
        return;
    }
    for (var i = 0; i < this.childNode.length; i++) {
        if (this.childNode[i].type == "item") {
            this.childNode[i].searchAndShownHidden(searchText, this.children[i]);
        }
        else if (this.childNode[i].type == "node") {
            this.childNode[i].searchInTheChildNode(searchText);
        }
    }
};

Node.prototype.checkAllCheckboxes= function() {
    if (!this.childNode) {
        return;
    }
    for (var i = 0; i < this.childNode.length; i++) {
        if (this.childNode[i].type == "item") {
            this.childNode[i].checkValue(this.children[i]);
        }
        else if (this.childNode[i].type == "node") {
            this.childNode[i].checkAllCheckboxes();
        }
    }
};

function clearAllClassesHiddenShown() {
    node.searchInTheChildNode("");
}
// Search function
input.addEventListener("search", getSearchValue);
function getSearchValue() {
    node.searchInTheChildNode(input.value);
}
// clear classes functionality
button.addEventListener("click", clearAllClassesHiddenShown);
// checkboxes functionality
btnIsChecked.addEventListener("click", clickOnCheckbox);
function clickOnCheckbox() {
    node.checked = [];
    node.checkAllCheckboxes();
    var divForAlert = document.createElement("div");
    if (node.checked.length == 0){
        alert("Please, select any checkbox");
    }
    else {
        for(var i = 0; i <node.checked.length; i++) {
            var textForAlertElement = document.createElement("p");
            textForAlertElement.innerHTML = node.checked[i] + "<br />";
            divForAlert.appendChild(textForAlertElement);
        }
        alert(divForAlert.innerText);
    }
}