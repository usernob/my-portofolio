const elements = document.querySelectorAll(".aos");

const setTranslate = (element, value = "0 50%") => {
	[x, y] = value.split(" ");
	element.style.transform = `translate(${x}, ${y})`;
};

const callback = (entries) => {
	entries.forEach((entry) => {
		const target = entry.target;
		if (entry.isIntersecting) {
			target.style.opacity = 1;
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
	element.style.opacity = 0;
	if (element.dataset.mode == "move") {
		setTranslate(element, element.dataset.translatein);
	}
	if (element.dataset.mode == "progress") {
		element.style.width = 0;
	}
	if (element.dataset.boot == "true") {
		setTimeout(() => {
			element.style.transform = "translate(0)";
			element.style.opacity = 1;
		}, 200);
	}
	observer.observe(element);
});
