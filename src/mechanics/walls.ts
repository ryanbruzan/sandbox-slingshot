import Matter from 'matter-js';
import { world } from './engine';

const WALL_THICKNESS = window.innerWidth * 2;

const topWall = Matter.Bodies.rectangle(
    window.innerWidth / 2,
    -WALL_THICKNESS / 2,
    window.innerWidth * 2,
    WALL_THICKNESS,
    { isStatic: true, render: { fillStyle: '#aaa' } }
);

const rightWall = Matter.Bodies.rectangle(
    window.innerWidth + WALL_THICKNESS / 2,
    window.innerHeight / 2,
    WALL_THICKNESS,
    window.innerHeight * 2,
    { isStatic: true, render: { fillStyle: '#aaa' } }
);

const bottomWall = Matter.Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + WALL_THICKNESS / 2,
    window.innerWidth * 2,
    WALL_THICKNESS,
    { isStatic: true, render: { fillStyle: '#aaa' } }
);

const leftWall = Matter.Bodies.rectangle(
    -WALL_THICKNESS / 2,
    window.innerHeight / 2,
    WALL_THICKNESS,
    window.innerHeight * 2,
    { isStatic: true, render: { fillStyle: '#aaa' } }
);

Matter.World.add(world, [topWall, rightWall, bottomWall, leftWall]);