import { lazy } from 'react';

// Markdown
import NonlinearBisectionMarkdown from '../components/methods/nonlinear/markdown/bisection.md';
import NonlinearNewtonMarkdown from '../components/methods/nonlinear/markdown/newton.md';
import NonlinearSecantMarkdown from '../components/methods/nonlinear/markdown/secant.md';

import LinearJacobiSeidelMarkdown from '../components/methods/linear/markdown/jacobiSeidel.md';


import DiffFiniteMarkdown from '../components/methods/differential/markdown/finite.md';

import IntegralTrapezoidalMarkdown from '../components/methods/integral/markdown/trapezoidal.md';
import IntegralSimpsonMarkdown from '../components/methods/integral/markdown/simpson.md';


import OdeEulerMarkdown from '../components/methods/ode/markdown/euler.md';
import OdeTaylorMarkdown from '../components/methods/ode/markdown/taylor.md';
import OdeRungeMarkdown from '../components/methods/ode/markdown/runge.md';

// JSX Components
const NonlinearBisection = lazy(() => import('../components/methods/nonlinear/Bisection'));
const NonlinearNewton = lazy(() => import('../components/methods/nonlinear/Newton'));
const NonlinearSecant = lazy(() => import('../components/methods/nonlinear/Secant'));


const LinearJacobiSeidel = lazy(() => import('../components/methods/linear/JacobiSeidel'));

const DiffFinite = lazy(() => import('../components/methods/differential/Finite'));


const IntegralTrapezoidal = lazy(() => import('../components/methods/integral/Trapezoidal'));
const IntegralSimpson = lazy(() => import('../components/methods/integral/Simpson'));

const OdeEuler = lazy(() => import('../components/methods/ode/Euler'));
const OdeTaylor = lazy(() => import('../components/methods/ode/Taylor'));
const OdeRunge = lazy(() => import('../components/methods/ode/Runge'));


const categories = [
    {
        name: "Nonlinear Equations",
        path: "nonlinear",
        methods: [
            {
                name: "Bisection",
                path: "bisection",
                component: NonlinearBisection,
                completed: true,
                markdown: NonlinearBisectionMarkdown,
            },

            {
                name: "Newton-Rhapson",
                path: "newton",
                component: NonlinearNewton,
                completed: true,
                markdown: NonlinearNewtonMarkdown,
            },
            {
                name: "Modified Secant",
                path: "secant",
                component: NonlinearSecant,
                completed: true,
                markdown: NonlinearSecantMarkdown,
            },
            {
                name: "Jacobi / Gauss-Seidel Iteration",
                path: "jacobi_seidel",
                component: LinearJacobiSeidel,
                completed: true,
                markdown: LinearJacobiSeidelMarkdown,
            },
            {
                name: "Finite Difference",
                path: "finite",
                component: DiffFinite,
                completed: true,
                markdown: DiffFiniteMarkdown,
            },
            {
                name: "Trapezoidal",
                path: "trapezoidal",
                component: IntegralTrapezoidal,
                completed: true,
                markdown: IntegralTrapezoidalMarkdown,
            },
            {
                name: "Simpson's Method",
                path: "simpson",
                component: IntegralSimpson,
                completed: true,
                markdown: IntegralSimpsonMarkdown,
            },
            {
                name: "Euler's Method",
                path: "euler",
                component: OdeEuler,
                completed: true,
                markdown: OdeEulerMarkdown,
            },
            {
                name: "Taylor Series Method",
                path: "taylor",
                component: OdeTaylor,
                completed: true,
                markdown: OdeTaylorMarkdown,
            },
            {
                name: "4th Order Runge-Kutta",
                path: "runge",
                component: OdeRunge,
                completed: true,
                markdown: OdeRungeMarkdown,
            },
        ]
    },




]

export default categories;