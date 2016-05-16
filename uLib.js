/* function : to restore form
 *
 * usage: add class 'restoreForm' to the form
 * eg. <form class="restoreForm">...</form>
 */
var startRestore = function() {
    function getIndex(node, parent, type) {
        var children = parent.getElementsByTagName(type);
        for (var i = 0; i < children.length; i++) {
            if (node == children[i]) {
                console.log("----- " + i);
                return i;
            }
        }
    }

    var formList = document.getElementsByClassName("restoreForm");

    function initFormListener() {
        for (var i = 0; i < formList.length; i++) {
            (function(j) {
                var form = formList[j];
                form.oninput = function(e) {
                    var e = e || window.event;
                    if (e.target && e.target.nodeName.toUpperCase() == "INPUT") {
                        var input = e.target;
                        localStorage.setItem(j + "" + getIndex(input, form, "input") + input.name, input.value);
                    }
                }
            })(i);
        }
    }

    function fillingForm() {
        for (var i = 0; i < formList.length; i++) {
            var form = formList[i];
            var input = form.getElementsByTagName("input");
            for (var j = 0; j < input.length; j++) {
                (function(m, n) {
                    var innerContent = localStorage.getItem(m + "" + n + input[n].name);
                    input[n].value = innerContent ? innerContent : input[n].value;
                })(i, j);
            }
        }
    }

    function cleanRestore() {
        for (var i = 0; i < formList.length; i++) {
            (function(k) {
                var form = formList[k];
                form.onclick = function(e) {
                    if (e.target && e.target.className.toUpperCase() == "CLEANRESTORE") {
                        var formIndex = getIndex(form, document, "form");
                        var input = form.getElementsByTagName("input");
                        for (var j = 0; j < input.length; j++) {
                            console.log(formIndex + "" + j + input[j].name);
                            localStorage.removeItem(formIndex + "" + j + input[j].name);
                        }
                    }
                }
            })(i);
        }
    }

    initFormListener();
    fillingForm();
    cleanRestore();
};

/*
 * function : translate a string to number for selected types
 *
 * str   : string to be translated
 * type  : 1 - all numbers link together eg. 12ss5s7 -> 1257
 *         2 - choose each number single eg. 12ss5s7 -> [1,2,5,7]
 *         3 - choose number linked eg. 12ss5s7 -> [12, 5, 7]
 * index : if type == 2 or 3, return the index number of the anwser
 */
var transNumber(str, type, index) {
    if (type == 1) {
        var patten = /\d+/ig;
        return parseInt(str.match(patten).join(""));
    } else if (type == 2) {
        var patten = /[0-9]/ig;
        return index || index == 0 ? str.match(patten).map(Number)[index] : str.match(patten).map(Number);
    } else if (type == 3) {
        var patten = /[0-9]*/ig;
        var res = str.match(patten);
        for (var i = 0; i < res.length; i++) {
            if (res[i] == "") {
                res.splice(i, 1);
                i--;
            }
        }
        res = res.map(Number);

        return index || index == 0 ? res[index] : res;
    }
    return parseInt(str);
};
