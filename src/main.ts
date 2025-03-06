import { getRandomColor } from '@/utils/getRandomColor';
import Matter from 'matter-js';
import './style.css';

const WALL_THICKNESS = 200;

const engine = Matter.Engine.create({
	positionIterations: 10,
	velocityIterations: 8,
});

const world = engine.world;

const render = Matter.Render.create({
	element: document.body,
	engine: engine,
	options: {
		width: window.innerWidth,
		height: window.innerHeight,
		wireframes: false,
		background: '#f0f0f0',
	},
});

// Add mouse control
const mouse = Matter.Mouse.create(render.canvas);
const mouseConstraint = Matter.MouseConstraint.create(engine, {
	mouse: mouse,
	constraint: {
		stiffness: 0.05,
		render: {
			visible: true,
		},
	},
});
Matter.Composite.add(world, mouseConstraint);
render.mouse = mouse;

const topWall = Matter.Bodies.rectangle(
	window.innerWidth / 2,
	-WALL_THICKNESS / 2,
	window.innerWidth,
	WALL_THICKNESS,
	{ isStatic: true, render: { fillStyle: '#aaa' }, density: 1000000 }
);
const rightWall = Matter.Bodies.rectangle(
	window.innerWidth + WALL_THICKNESS / 2,
	window.innerHeight / 2,
	WALL_THICKNESS,
	window.innerHeight,
	{ isStatic: true, render: { fillStyle: '#aaa' }, density: 1000000 }
);
const bottomWall = Matter.Bodies.rectangle(
	window.innerWidth / 2,
	window.innerHeight + WALL_THICKNESS / 2,
	window.innerWidth,
	WALL_THICKNESS,
	{ isStatic: true, render: { fillStyle: '#aaa' }, density: 1000000 }
);
const leftWall = Matter.Bodies.rectangle(
	-WALL_THICKNESS / 2,
	window.innerHeight / 2,
	WALL_THICKNESS,
	window.innerHeight,
	{ isStatic: true, render: { fillStyle: '#aaa' }, density: 1000000 }
);
Matter.World.add(world, [topWall, rightWall, bottomWall, leftWall]);

function createBall(x: number, y: number) {
	const ball = Matter.Bodies.circle(x, y, 20, {
		restitution: 0.8,
		render: {
			fillStyle: getRandomColor(),
		},
		frictionAir: 0.001,
		friction: 0.1,
		slop: 0.05,
	});
	Matter.World.add(world, ball);

	// Apply random horizontal force
	const forceX = (Math.random() - 0.5) * 0.05; // Random force between -0.025 and 0.025
	Matter.Body.applyForce(ball, ball.position, { x: forceX, y: -0.05 });
}

setInterval(() => {
	createBall(window.innerWidth / 2, window.innerHeight / 2);
}, 50);

Matter.Runner.run(engine);
Matter.Render.run(render);

function resizeCanvas() {
	render.canvas.width = window.innerWidth;
	render.canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
