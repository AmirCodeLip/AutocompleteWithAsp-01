document.querySelectorAll(".auto-finder").forEach(autoFinder => {
    let txtBox = autoFinder.getElementsByTagName("input")[0],
        autoFiller = autoFinder.getElementsByClassName("auto-filler")[0],
        ulTag = autoFiller.getElementsByTagName("ul")[0],
        childs = ulTag.getElementsByTagName("li")
    indexActive = 0;

    function active(next) {
        let active = childs[indexActive];
        if (!active) {
            indexActive = 0;
            return;
        }
        if (childs.length === 0)
            return;
        if (active.classList.contains("active")) {
            active.classList.remove("active");
            indexActive += next;
            active = childs[indexActive];
            if (!active) {
                if (next > 0) {
                    indexActive = 0;
                }
                else {
                    indexActive = childs.length - 1;
                }
                active = childs[indexActive];
            }

        }
        active.classList.add("active");

    }

    txtBox.addEventListener("keyup", function (e) {
        if (this.value.length > 0) {
            autoFinder.classList.add("active-auto-finder");
        }
        else {
            autoFinder.classList.remove("active-auto-finder");
        }

        switch (e.keyCode) {
            case 38:
                active(-1);
                break;
            case 40:
                active(+1);
                break;
            case 13:
                let item = childs[indexActive];
                if (!item)
                    return;
                txtBox.value = item.children[1].innerText.replace("/ /g", "");


                resetAuto(item);
               
        }
    });

    function resetAuto(item) {
        item.classList.remove("active-auto-finder");
        indexActive = 0;
        autoFinder.classList.remove("active-auto-finder");

    }

    ulTag.addEventListener("click", function (e) {
        let target = e.target;
        if (target.tagName === "I")
            target = target.parentElement;
        if (target.tagName === "SPAN")
            target = target.parentElement;
        if (target.tagName === "LI")
            target = target.children[1];

        txtBox.value = target.innerText.replace("/ /g", "");
        resetAuto(target.parentElement);
    });
});