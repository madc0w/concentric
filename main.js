let t = 0;
let canvas, ctx;
const mousePos = { x: 0, y: 0 };

function load() {
	document.addEventListener('mousemove', (e) => {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	});

	canvas = document.getElementById('canvas');
	canvas.height = innerHeight - 20;
	canvas.width = innerWidth - 20;
	ctx = canvas.getContext('2d');
	paint();
}

function paint() {
	ctx.fillStyle = '#a00';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 8;
	for (
		let r = 0;
		r < Math.max(canvas.width, canvas.height);
		r += ctx.lineWidth
	) {
		const opacity = Math.round(127 * (Math.sin(t / 8 + r / 20) + 1));
		let opacityStr = opacity.toString(16);
		if (opacityStr.length < 2) {
			opacityStr = `0${opacityStr}`;
		}
		ctx.strokeStyle = `#000000${opacityStr}`;
		// console.log(r, opacityStr);
		ctx.beginPath();
		ctx.arc(mousePos.x, mousePos.y, r, 0, 2 * Math.PI);
		ctx.stroke();
	}

	t++;
	requestAnimationFrame(paint);
}
