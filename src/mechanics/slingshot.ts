import { getRandomColor } from '@/utils/getRandomColor';
import Matter from 'matter-js';
import { engine, render, world } from './engine';

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

let slingshotBall: Matter.Body | null = null;
let slingshotConstraint: Matter.Constraint | null = null;

function createSlingshotBall(x: number, y: number) {
	const color = getRandomColor();

    slingshotBall = Matter.Bodies.circle(x, y, 20, {
        restitution: 0.9,
        render: {fillStyle: color},
        frictionAir: 0.001,
        friction: 0.1,
        slop: 0.05,
    });
    slingshotConstraint = Matter.Constraint.create({
        pointA: { x, y },
        bodyB: slingshotBall,
        stiffness: 0.05,
		render: {
			visible: true,
			strokeStyle: color
		},
    });
    Matter.World.add(world, [slingshotBall, slingshotConstraint]);
}

function launchSlingshotBall() {
    if (slingshotBall && slingshotConstraint) {
        const mousePosition = mouse.position;
        const ballPosition = slingshotBall.position;
        const forceMagnitude = 0.001;
        const force = {
            x: (ballPosition.x - mousePosition.x) * forceMagnitude,
            y: (ballPosition.y - mousePosition.y) * forceMagnitude,
        };

        Matter.Body.applyForce(slingshotBall, ballPosition, force);

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