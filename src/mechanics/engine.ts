import Matter from 'matter-js';

export const engine = Matter.Engine.create({
    positionIterations: 10,
    velocityIterations: 8,
});

export const world = engine.world;

export const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#f0f0f0',
    },
});

export function resizeCanvas() {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
}

Matter.Runner.run(engine);
Matter.Render.run(render);

window.addEventListener('resize', resizeCanvas);
resizeCanvas();