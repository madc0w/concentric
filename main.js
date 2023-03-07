let t = 0;
let canvas, ctx;
const waves = [];

function load() {
	document.addEventListener('mouseup', (e) => {
		waves.push({
			x: e.clientX,
			y: e.clientY,
			// color: randomColor(),
			color: '000000',
			amplitude: 0.4 + Math.random() * 0.6,
			freq: 12 + Math.random() * 40,
		});
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

	ctx.lineWidth = 4;
	for (const wave of waves) {
		for (
			let r = 0;
			r < Math.max(canvas.width, canvas.height);
			r += ctx.lineWidth
		) {
			const opacity = Math.round(
				wave.amplitude * 127 * (Math.sin(t / 8 + r / wave.freq) + 1)
			);
			let opacityStr = opacity.toString(16);
			if (opacityStr.length < 2) {
				opacityStr = `0${opacityStr}`;
			}
			ctx.strokeStyle = `#${wave.color}${opacityStr}`;
			// console.log(r, opacityStr);
			ctx.beginPath();
			ctx.arc(wave.x, wave.y, r, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}
	for (const wave of waves) {
		const opacity = Math.round(127 * Math.sin(t / (8 * wave.freq) + 1));
		let opacityStr = opacity.toString(16);
		if (opacityStr.length < 2) {
			opacityStr = `0${opacityStr}`;
		}
		console.log(opacityStr);
		ctx.fillStyle = `#00ddff${opacityStr}`;
		ctx.beginPath();
		ctx.arc(wave.x, wave.y, wave.amplitude * 20, 0, 2 * Math.PI);
		ctx.fill();
	}

	t++;
	requestAnimationFrame(paint);
}

function randomColor() {
	const c = Math.floor(Math.random() * 16 ** 6);
	let color = c.toString(16);
	while (color.length < 6) {
		color = `0${color}`;
	}
	return color;
}
