import { lazy } from 'react';

// Markdown
import NonlinearBisectionMarkdown from '../components/methods/nonlinear/markdown/bisection.md';
import NonlinearFalsePositionMarkdown from '../components/methods/nonlinear/markdown/falsePosition.md';
import NonlinearFixedPointMarkdown from '../components/methods/nonlinear/markdown/fixedPoint.md';
import NonlinearNewtonMarkdown from '../components/methods/nonlinear/markdown/newton.md';
import NonlinearSecantMarkdown from '../components/methods/nonlinear/markdown/secant.md';

import LinearGaussMarkdown from '../components/methods/linear/markdown/gauss.md';
import LinearJacobiSeidelMarkdown from '../components/methods/linear/markdown/jacobiSeidel.md';
import LinearLUMarkdown from '../components/methods/linear/markdown/lu.md';
import LinearQRMarkdown from '../components/methods/linear/markdown/qr.md';
import LinearSVDMarkdown from '../components/methods/linear/markdown/svd.md';
import LinearInverseMarkdown from '../components/methods/linear/markdown/inverse.md';
import LinearPenroseMarkdown from '../components/methods/linear/markdown/penrose.md';

import EigenPowerMarkdown from '../components/methods/eigen/markdown/power.md';
import EigenInverseMarkdown from '../components/methods/eigen/markdown/inversePower.md';
import EigenShiftedMarkdown from '../components/methods/eigen/markdown/shiftedPower.md';
import EigenDiscsMarkdown from '../components/methods/eigen/markdown/discs.md';

import OptiGoldenSearchMarkdown from '../components/methods/optimisation/markdown/goldenSearch.md';
import OptiGradientMarkdown from '../components/methods/optimisation/markdown/gradient.md';

import DiffFiniteMarkdown from '../components/methods/differential/markdown/finite.md';

import IntegralMidpointMarkdown from '../components/methods/integral/markdown/midpoint.md';
import IntegralTrapezoidalMarkdown from '../components/methods/integral/markdown/trapezoidal.md';
import IntegralSimpsonMarkdown from '../components/methods/integral/markdown/simpson.md';
import IntegralQuadratureMarkdown from '../components/methods/integral/markdown/quadrature.md';
import IntegralMonteCarloMarkdown from '../components/methods/integral/markdown/monteCarlo.md';

import OdeEulerMarkdown from '../components/methods/ode/markdown/euler.md';
import OdeTaylorMarkdown from '../components/methods/ode/markdown/taylor.md';
import OdeRungeMarkdown from '../components/methods/ode/markdown/runge.md';
import OdeMultistepMarkdown from '../components/methods/ode/markdown/multistep.md';
import OdeSystemMarkdown from '../components/methods/ode/markdown/system.md';
import OdeShootingMarkdown from '../components/methods/ode/markdown/shooting.md';
import OdeFiniteDiffMarkdown from '../components/methods/ode/markdown/finiteDiff.md';

// JSX Components
const NonlinearBisection = lazy(() => import('../components/methods/nonlinear/Bisection'));
const NonlinearFalsePosition = lazy(() => import('../components/methods/nonlinear/FalsePosition'));
const NonlinearNewton = lazy(() => import('../components/methods/nonlinear/Newton'));
const NonlinearSecant = lazy(() => import('../components/methods/nonlinear/Secant'));
const NonlinearFixedPoint = lazy(() => import('../components/methods/nonlinear/FixedPoint'));

const LinearGauss = lazy(() => import('../components/methods/linear/Gauss'));
const LinearJacobiSeidel = lazy(() => import('../components/methods/linear/JacobiSeidel'));
const LinearLU = lazy(() => import('../components/methods/linear/LU'));
const LinearSVD = lazy(() => import('../components/methods/linear/SVD'));
const LinearQR = lazy(() => import('../components/methods/linear/QR'));
const LinearInverse = lazy(() => import('../components/methods/linear/Inverse'));
const LinearPenrose = lazy(() => import('../components/methods/linear/PenroseInverse'));

const EigenPower = lazy(() => import('../components/methods/eigen/Power'));
const EigenInversePower = lazy(() => import('../components/methods/eigen/InversePower'));
const EigenShiftedPower = lazy(() => import('../components/methods/eigen/ShiftedPower'));
const EigenDiscs = lazy(() => import('../components/methods/eigen/Discs'));

const OptiGoldenSearch = lazy(() => import('../components/methods/optimisation/GoldenSearch'));
const OptiGradient = lazy(() => import('../components/methods/optimisation/Gradient'));

const DiffFinite = lazy(() => import('../components/methods/differential/Finite'));
const DiffMultivariable = lazy(() => import('../components/methods/differential/Multivariable'));

const IntegralMidpoint = lazy(() => import('../components/methods/integral/Midpoint'));
const IntegralTrapezoidal = lazy(() => import('../components/methods/integral/Trapezoidal'));
const IntegralSimpson = lazy(() => import('../components/methods/integral/Simpson'));
const IntegralQuadrature = lazy(() => import('../components/methods/integral/Quadrature'));
const IntegralMonteCarlo = lazy(() => import('../components/methods/integral/MonteCarlo'));

const OdeEuler = lazy(() => import('../components/methods/ode/Euler'));
const OdeTaylor = lazy(() => import('../components/methods/ode/Taylor'));
const OdeRunge = lazy(() => import('../components/methods/ode/Runge'));
const OdeMultistep = lazy(() => import('../components/methods/ode/Multistep'));
const OdeSystem = lazy(() => import('../components/methods/ode/System'));
const OdeShooting = lazy(() => import('../components/methods/ode/Shooting'));
const OdeFiniteDiff = lazy(() => import('../components/methods/ode/FiniteDiff'));

const FFT = lazy(() => import('../components/methods/fourier/FFT'));

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
        ]
    },
    {
        name: "Linear Equations",
        path: "linear",
        methods: [

            {
                name: "Jacobi / Gauss-Seidel Iteration",
                path: "jacobi_seidel",
                component: LinearJacobiSeidel,
                completed: true,
                markdown: LinearJacobiSeidelMarkdown,
            },

        ]
    },
    {
        name: "Numerical Differentiation",
        path: "differential",
        methods: [
            {
                name: "Finite Difference",
                path: "finite",
                component: DiffFinite,
                completed: true,
                markdown: DiffFiniteMarkdown,
            },

        ]
    },
    {
        name: "Numerical Integration",
        path: "integral",
        methods: [

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
        ]
    },
    {
        name: "Ordinary Differential Equations",
        path: "ode",
        methods: [
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