const elements = document.querySelectorAll(".aos");

const setTranslate = (element, value = "0 50%") => {
	[x, y] = value.split(" ");
	element.style.transform = `translate(${x}, ${y})`;
};

const callback = (entries) => {
	entries.forEach((entry) => {
		const target = entry.target;
		if (entry.isIntersecting) {
            target.classList.add("aos-active");
			if (target.dataset.mode == "move") {
				target.style.transform = "translate(0)";
			}
			if (target.dataset.mode == "progress") {
				target.style.width = target.dataset.progress;
			}
		}
	});
};

const observer = new IntersectionObserver(callback, {
	threshold: 0.3,
});

elements.forEach((element) => {
	if (element.dataset.mode == "move") {
		setTranslate(element, element.dataset.translatein);
	}
	if (element.dataset.mode == "progress") {
		element.style.width = 0;
	}
	if (element.dataset.boot == "true") {
		setTimeout(() => {
            element.classList.add("aos-active");
			element.style.transform = "translate(0)";
		}, 500);
        return;
	}
	observer.observe(element);
});
