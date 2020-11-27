// const {
//     fn
// } = require("jquery");

window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === "string") {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }

    // const api = {
    //     addClass(className) {
    //         //闭包：函数访问外部变量
    //         for (let i = 0; i < elements.length; i++) {
    //             elements[i].classList.add(className)
    //         }
    //         return this //this就是api，也可以return api
    //     }
    // }
    // return api;
    return {
        oldApi: selectorOrArray.oldApi,
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                array = array.concat(Array.from(elements[i].querySelectorAll(selector)));
            }
            // const newApi = jQuery(array)
            // return newApi;
            array.oldApi = this;
            return jQuery(array)
        },
        addClass(className) {
            //闭包：函数访问外部变量
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this //this就是api，也可以return api
        },
        end() {
            return this.oldApi;
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        parent() {
            const array = []
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        print() {
            console.log(elements)
        },
        children() {
            const array = [];
            this.each((node) => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(...node.children)
                    //等价于 array.push(node.children[0],node.children[1],node.children[2],...,node.children[n])
                }
            })
            return jQuery(array)
        }
    }
}