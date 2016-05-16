// function to restore form
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
