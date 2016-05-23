/**
 * Created by mazay1907 on 5/16/2016.
 */
var jsonFile = new XMLHttpRequest(),
    linkToJson = "generated1.json";
    //obj1 = new Object;

jsonFile.open("GET", linkToJson);
jsonFile.send(null);

jsonFile.onload = function() {
    var responseJson = jsonFile.responseText;
    //console.log("2 - " + responseJson);
    //console.log("////////////////////");

    var parseJson = JSON.parse(responseJson);
};

    //myFunc(parseJson);
    //isObject1.call(parseJson, obj1);

    //console.log(parseJson.getOwnPropertyNames);
    /*for (var name in parseJson.main) {
        if (parseJson.main.hasOwnProperty(name)) {
            console.log('this is fog (' + name + ') for sure. Value: ' + parseJson.main[name]);
        }
        else {
            console.log(name); // toString or something else
        }  */

























































//document.getElementById("demo").innerHTML
/*
function isObject1(defaultObj) {
    //console.log(typeof this["repository"] == "object");
    for(i in this) {
        //console.log(i + " " + this[i]);
        if (typeof this[i] == "string"){
        defaultObj[i] = this[i]
    }
    else if (Array.isArray(this[i])) {
        // made something with array
        defaultObj[i] = this[i];
            //console.log(i + " " + this[i]);

        }
    else if (typeof this[i] == "object"){
            console.log(i + " " + this[i]);
            isObject1.call(this[i]);
            /!*this[i] = function() {
            console.log(i + " " + this[i]);
            isObject1.call(this[i]);

        }
    }

    }
    console.log(defaultObj);

}*/
//if (this[i] != "[object Object]"){






//var newObject = new Object;
// 1
/*newObject.func = function myFunc(obj, newObj) {
    var i, y;
    for(i in obj) {
        if (typeof obj[i] != "object") {
            newObj[i] = obj[i];
        }
        else {
            for(y in obj[i]) {
                newObj[i] = obj[i];

            }
        }
    }
    console.log(newObject);
}*/
//2

/*newObject.func = function myFunc(obj) {
    var i, y;
    for(i in obj) {
        if (typeof obj[i] != "object") {
            this[i] = obj[i];
        }
        else {
            for(y in obj[i]) {
                this[i] = obj[i];

            }
        }
    }
    console.log(newObject);
}*/
//3
/*
function myFunc(JsonToobject) {
    var i, y;
    newObject.func = foo(JsonToobject, this);
    function foo(obj) {

        for(i in obj) {
            //console.log(obj);
            //console.log(this.ob[i]);
            console.log(i + " " + obj[i]);
            if (typeof obj[i] == "string") {
                this[i] = obj[i];
            }
            //this[i] = obj[i];
            /!*if (typeof obj[i] != "object") {
             //this[i] = obj[i];
             }*!/
            else {
                for (y in obj[i]) {
                    //console.log(obj[i]);
                    //foo(obj[i])
                }

            }
        }

    };
    newObject.func(JsonToobject);

    console.log(newObject);
}
*/
//4
/*
function myFunc(JsonToobject) {
    var fooObj =  new Object;
    fooObj.func = someName(JsonToobject, "fooObj");
    function someName(dataObj, name) {
        var variable = name;
        this.name = new Object;
        this.variable = dataObj;


        //console.log("this[0] = " + this.name);
        //console.log("this[0] = " + variable);

    };
    //console.log("fooObj = " + fooObj);


}
//console.log("newObject = " + newObject);
*/


















