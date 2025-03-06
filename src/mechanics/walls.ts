import Matter from "matter-js";
import { world } from "./engine";

let WALL_THICKNESS = window.innerWidth * 2;

const topWall = Matter.Bodies.rectangle(
	window.innerWidth / 2,
	-WALL_THICKNESS / 2,
	window.innerWidth * 2,
	WALL_THICKNESS,
	{ isStatic: true, render: { fillStyle: "#aaa" } },
);

const rightWall = Matter.Bodies.rectangle(
	window.innerWidth + WALL_THICKNESS / 2,
	window.innerHeight / 2,
	WALL_THICKNESS,
	window.innerHeight * 2,
	{ isStatic: true, render: { fillStyle: "#aaa" } },
);

const bottomWall = Matter.Bodies.rectangle(
	window.innerWidth / 2,
	window.innerHeight + WALL_THICKNESS / 2,
	window.innerWidth * 2,
	WALL_THICKNESS,
	{ isStatic: true, render: { fillStyle: "#aaa" } },
);

const leftWall = Matter.Bodies.rectangle(
	-WALL_THICKNESS / 2,
	window.innerHeight / 2,
	WALL_THICKNESS,
	window.innerHeight * 2,
	{ isStatic: true, render: { fillStyle: "#aaa" } },
);

Matter.World.add(world, [topWall, rightWall, bottomWall, leftWall]);

window.addEventListener("resize", () => {
	WALL_THICKNESS = window.innerWidth * 2;

	Matter.Body.setPosition(topWall, {
		x: window.innerWidth / 2,
		y: -WALL_THICKNESS / 2,
	});
	Matter.Body.setPosition(rightWall, {
		x: window.innerWidth + WALL_THICKNESS / 2,
		y: window.innerHeight / 2,
	});
	Matter.Body.setPosition(bottomWall, {
		x: window.innerWidth / 2,
		y: window.innerHeight + WALL_THICKNESS / 2,
	});
	Matter.Body.setPosition(leftWall, {
		x: -WALL_THICKNESS / 2,
		y: window.innerHeight / 2,
	});

	Matter.Body.setVertices(
		topWall,
		Matter.Bodies.rectangle(
			window.innerWidth / 2,
			-WALL_THICKNESS / 2,
			window.innerWidth * 2,
			WALL_THICKNESS,
		).vertices,
	);
	Matter.Body.setVertices(
		rightWall,
		Matter.Bodies.rectangle(
			window.innerWidth + WALL_THICKNESS / 2,
			window.innerHeight / 2,
			WALL_THICKNESS,
			window.innerHeight * 2,
		).vertices,
	);
	Matter.Body.setVertices(
		bottomWall,
		Matter.Bodies.rectangle(
			window.innerWidth / 2,
			window.innerHeight + WALL_THICKNESS / 2,
			window.innerWidth * 2,
			WALL_THICKNESS,
		).vertices,
	);
	Matter.Body.setVertices(
		leftWall,
		Matter.Bodies.rectangle(
			-WALL_THICKNESS / 2,
			window.innerHeight / 2,
			WALL_THICKNESS,
			window.innerHeight * 2,
		).vertices,
	);
});
