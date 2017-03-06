// TASK 1
function firstParamPerantOtherChildren() {
    var arrayArguments = Array.prototype.slice.call(arguments);
    var parent = document.createElement(arrayArguments[0])
    document.body.appendChild(parent);
    for (var index = 1; index < arrayArguments.length; index++) {
        parent.appendChild(document.createElement(arrayArguments[index]));
    }
}

// TASK 2
function inputToParagraph() {
    var inputs = document.getElementsByTagName("input");
    for (var index = 0; index < inputs.length; index++) {
        var text = inputs[index].value;
        var paragraph = document.createElement("p");
        var paragraphText = document.createTextNode(text);
        paragraph.appendChild(paragraphText);
        document.body.appendChild(paragraph);
    }
}

// TASK 3
function justcause(array) {
    var index = 0;
    while ((Array.isArray(array[index]) && array[index].length > 1)) {
        justcause(array[index]);
        index++
    }
        var parent = document.createElement("DIV");
        document.body.appendChild(parent);
    for (; index < array.length; index++) {
        if (Array.isArray(array[index]) && array[index].length >= 1) {
            justcause(array[index]);
            continue;
        }
        if (Array.isArray(array[index]) && array[index].length == 0){
            continue;
        }
        parent.appendChild(document.createElement(array[index]));
    }
}
// TASK 4

function Person(name, age, picture) {
    this.name = name;
    this.age = age;
    this.picture = picture;
}

Person.prototype.personToDiv = function () {
    var div = document.createElement("DIV");
    document.body.appendChild(div);
    var picture = document.createElement("IMG");
    div.appendChild(picture);
    picture.src = this.picture;
    picture.style.display = "block";
    picture.style.width = "150px";
    picture.style.height = "auto";
    picture.alt = "Picture of " + this.name;
    var paragraph = document.createElement("P");
    var text = document.createTextNode("Name : " + this.name);
    paragraph.appendChild(text);
    div.appendChild(paragraph);
    var paragraph2 = document.createElement("P");
    var text2 = document.createTextNode("Age : " + this.age);
    paragraph2.appendChild(text2);
    div.appendChild(paragraph2);
}

// TASK 5

var cart = {
    items: [],

    addToCart: function (product) {
        cart.items.push(product);
        var paragraph = document.createElement("P");
        var text = document.createTextNode("Remove " + product.name);
        document.getElementById("cart").appendChild(paragraph);
        paragraph.appendChild(text);
        paragraph.id = "" + product.name;
        paragraph.setAttribute("onclick", "cart.removeItem(" + product.name + ")");
    },

    removeItem: function (product) {
        var indexOfElement = cart.items.indexOf(product.name);
        cart.items.splice(indexOfElement, 1);
        var cartItem = document.getElementById(product.name);
        cartItem.parentNode.removeChild(cartItem);
    },
}

function Product(name, price, weight) {
    this.weight = weight;
    this.price = price;
    this.name = name;

    var paragraph = document.createElement("P");
    var text = document.createTextNode(this.name + " тегло : " + this.weight + " цена : " + this.price);
    document.getElementById("products").appendChild(paragraph);
    paragraph.appendChild(text);
    paragraph.setAttribute("onclick", "cart.addToCart(" + this.name + ")");
}