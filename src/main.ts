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

let slingshotBall: Matter.Body | null = null;
let slingshotConstraint: Matter.Constraint | null = null;

function createSlingshotBall(x: number, y: number) {
	slingshotBall = Matter.Bodies.circle(x, y, 20, {
		restitution: 0.8,
		render: {
			fillStyle: getRandomColor(),
		},
		frictionAir: 0.001,
		friction: 0.1,
		slop: 0.05,
	});
	slingshotConstraint = Matter.Constraint.create({
		pointA: { x, y },
		bodyB: slingshotBall,
		stiffness: 0.05,
	});
	Matter.World.add(world, [slingshotBall, slingshotConstraint]);
}

function launchSlingshotBall() {
	if (slingshotBall && slingshotConstraint) {
		// Calculate the force based on the distance between the initial position and the current mouse position
		const mousePosition = mouse.position;
		const ballPosition = slingshotBall.position;
		const forceMagnitude = 0.001;
		const force = {
			x: (ballPosition.x - mousePosition.x) * forceMagnitude,
			y: (ballPosition.y - mousePosition.y) * forceMagnitude,
		};

		// Apply the calculated force to the ball
		Matter.Body.applyForce(slingshotBall, ballPosition, force);

		// Remove the constraint and reset the slingshot ball
		Matter.World.remove(world, slingshotConstraint);
		slingshotConstraint = null;
		slingshotBall = null;
	}
}

Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
	const { mouse } = event.source;
	createSlingshotBall(mouse.position.x, mouse.position.y);
});

Matter.Events.on(mouseConstraint, 'mouseup', () => {
	launchSlingshotBall();
});

Matter.Runner.run(engine);
Matter.Render.run(render);

function resizeCanvas() {
	render.canvas.width = window.innerWidth;
	render.canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
